// cSpell: ignore componentWillUnmount
import {
    Props,
    State,
    InnerInstance,
    AlienElement,
    FunctionComp
} from './types';

import {
    isText,
    isFunc,
    isClass,
    standardElement
} from './utils';

import Component from './component';
import {retrieveRender} from './inject';

const render = retrieveRender();

function createPublicInstance(element: AlienElement): Component<Props, State> {
    const {type, props} = element;
    const construct = type as any;
    const instance: Component<Props, State> = new construct(props);

    return instance;
}

function instantiate(element: AlienElement): InnerInstance {
    let innerInstance: InnerInstance = null;

    // 文本节点
    if (isText(element)) {
        innerInstance = {
            dom: render.createNativeTextNode(element),
            currentElement: element,
            childrenInstance: null,
        };
    }

    // class 类型组件
    else if (isClass(element)) {
        const publicInstance: Component<Props, State> = createPublicInstance(element);
        const childElement: AlienElement = standardElement(publicInstance.render());
        const childInstance = instantiate(childElement);

        // 支持 ref
        if (element.props.ref) {
            element.props.ref.current = publicInstance;
        }

        innerInstance = {
            dom: childInstance.dom,
            currentElement: element,
            childrenInstance: [childInstance],
            publicInstance
        }

        publicInstance.innerInstance = innerInstance;

        // 将 componentDidMount 放在设置 innerInstance 后
        // 保证 componentDidMount 可以正常触发 setState
        if (publicInstance.componentDidMount) {
            publicInstance.componentDidMount();
        }

    }


    // 纯函数组件
    else if (isFunc(element)) {
        const {type, props} = element;
        const childElement: AlienElement = standardElement((type as FunctionComp)(props));
        const childInstance = instantiate(childElement);

        innerInstance = {
            dom: childInstance.dom,
            currentElement: element,
            childrenInstance: [childInstance]
        };
    }

    // 原生组件
    else {
        const props = element.props;
        const elemNode = render.createNativeElementNode(element);

        // 支持 ref
        if (props.ref) {
            props.ref.current = elemNode;
        }

        // render.updateNativeProperties(elemNode, {}, props);

        let childrenInstance: InnerInstance[] = null;
        if (props.children) {
            childrenInstance = props.children
                //  过滤 null 组件
                .filter(child => child !== null)
                .map(instantiate);
            childrenInstance.forEach(instance => elemNode.appendChild(instance.dom));
        }

        innerInstance = {
            dom: elemNode,
            currentElement: element,
            childrenInstance
        };
    }

    return innerInstance;
}

function reconcileChildren(
    instance: InnerInstance,
    element: AlienElement
): InnerInstance[] {
    let elements: AlienElement[] = [];
    if (isFunc(element)) {
        elements = [(element.type as FunctionComp)(element.props)];
    }
    else {
        elements = element.props.children ? element.props.children : [];
    }
    // const elements = element.props.children ? element.props.children : [];
    const instances = instance.childrenInstance || [];
    const len = Math.max(elements.length, instances.length);
    const newChildrenInstance = [];

    for (let i = 0; i < len; i++) {
        const eleDom = instance.dom as HTMLElement;
        const newInstance = reconcile(eleDom, instances[i], elements[i]);
        if (newInstance) {
            newChildrenInstance.push(newInstance);
        }
    }

    return newChildrenInstance;
}

interface Visitor {
    match: (instance: InnerInstance) => boolean;
    operation: (instance: InnerInstance) => void;
}
function walk(root: InnerInstance, visitor: Visitor) {
    if (visitor.match(root)) {
        visitor.operation(root);
    }
    if (root.childrenInstance) {
        root.childrenInstance.forEach(instance => walk(instance, visitor));
    }
}

export function reconcile(
    parent: HTMLElement,
    instance: InnerInstance = null,
    element: AlienElement = null
): InnerInstance {
    let newInstance: InnerInstance = null;

    // 创建
    if (instance === null) {
        newInstance = instantiate(element);
        parent.appendChild(newInstance.dom);
    }

    // 删除
    else if (element === null) {
        walk(instance, {
            match: ins => Boolean(ins.publicInstance),
            operation: ins => {
                if (ins.publicInstance.componentWillUnmount) {
                    ins.publicInstance.componentWillUnmount();
                }
            }
        });
        parent.removeChild(instance.dom);
    }

    // 子树替换（html tag 变了，或者组件的构造函数变了）
    else if (instance.currentElement.type !== element.type) {
        newInstance = instantiate(element);

        if (
            isClass(instance.currentElement)
            && instance.publicInstance.componentWillUnmount
        ) {
            instance.publicInstance.componentWillUnmount();
        }

        parent.replaceChild(newInstance.dom, instance.dom);
    }

    // 原生元素，只进行属性更新
    else if (!isClass(instance.currentElement)) {
        render.updateNativeProperties(instance.dom, instance.currentElement.props, element.props);
        instance.currentElement = element;
        instance.childrenInstance = reconcileChildren(instance, element);
        newInstance = instance;
    }

    // 组件元素更新，注意，同时要更新当前的 innerInstance 的属性值
    else {
        const prevProps = instance.publicInstance.props;
        const publicInstance = instance.publicInstance;

        // TODO: maybe in wrong position, need to fix
        let snapshot = null;
        if (publicInstance.getSnapshotBeforeUpdate) {
            snapshot = publicInstance.getSnapshotBeforeUpdate(
                prevProps,
                publicInstance.prevState || publicInstance.state
            );
            if (snapshot === undefined) {
                snapshot = null;
            }
        }

        let needUpdate = true;
        if (publicInstance.shouldComponentUpdate) {
            needUpdate = publicInstance.shouldComponentUpdate(
                element.props,
                publicInstance.pendingState || publicInstance.state
            );
        }

        publicInstance.props = element.props;
        // 只在 shouldComponentUpdate 后将状态同步至最新
        publicInstance.syncStateIfNecessary();

        if (!needUpdate) {
            return instance;
        }

        const nextChildrenElement: AlienElement = standardElement(publicInstance.render());
        const prevChildInstance = instance.childrenInstance;

        // 目前不支持返回多个元素，因此对于组件元素它的 childrenInstance 肯定是一个元素，即 render 中返回的最外层元素
        const nextChildInstance = reconcile(parent, prevChildInstance[0], nextChildrenElement);

        if (publicInstance.componentDidUpdate) {
            publicInstance.componentDidUpdate(
                prevProps,
                publicInstance.prevState || publicInstance.state,
                snapshot
            );
        }

        instance.dom = nextChildInstance.dom;
        instance.childrenInstance = [nextChildInstance];
        instance.currentElement = element;
        newInstance = instance;
    }

    return newInstance;
}