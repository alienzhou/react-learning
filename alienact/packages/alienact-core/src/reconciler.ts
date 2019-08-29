// cSpell: ignore componentWillUnmount
import {
    Node,
    InnerInstance,
    AlienElement,
    FunctionComp
} from './types';

import {
    isFunc,
    isClass
} from './utils';

import Component from './component';
import {retrieveRender} from './inject';

const render = retrieveRender();

function createPublicInstance(element: AlienElement): Component {
    const {type, props} = element;
    const construct = type as any;
    const instance: Component = new construct(props);

    return instance;
}

function instantiate(node: Node): InnerInstance {

    let innerInstance: InnerInstance = null;

    // 文本节点
    if (
        typeof node === 'string'
        || typeof node === 'number'
        || typeof node === 'boolean'
    ) {
        innerInstance = {
            dom: render.createNativeTextNode(node),
            currentElement: node,
            childrenInstance: null,
        };
    }

    // class 类型组件
    else if (isClass(node)) {
        const publicInstance: Component = createPublicInstance(node);
        const childElement: AlienElement = publicInstance.render();
        const childInstance = instantiate(childElement);

        // 支持 ref
        if (node.props.ref) {
            node.props.ref.current = publicInstance;
        }

        if (publicInstance.componentDidMount) {
            publicInstance.componentDidMount();
        }

        innerInstance = {
            dom: childInstance.dom,
            currentElement: node,
            childrenInstance: [childInstance],
            publicInstance
        }

        publicInstance.innerInstance = innerInstance;
    }


    // 纯函数组件
    else if (isFunc(node)) {
        const {type, props} = node;
        const childElement: AlienElement = (type as FunctionComp)(props);
        const childInstance = instantiate(childElement);

        innerInstance = {
            dom: childInstance.dom,
            currentElement: node,
            childrenInstance: [childInstance]
        };
    }

    // 原生组件
    else {
        const {type, props} = node;
        const elemNode = render.createNativeElementNode(type);

        // 支持 ref
        if (props.ref) {
            props.ref.current = elemNode;
        }

        render.updateNativeProperties(elemNode, {}, props);

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
            currentElement: node,
            childrenInstance
        };
    }

    return innerInstance;
}

function reconcileChildren(
    instance: InnerInstance,
    element: AlienElement
): InnerInstance[] {
    let elements: Node[] = [];
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
    element: Node = null
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
    else if (
        typeof element === 'string'
        || typeof instance.currentElement === 'string'
        || typeof element === 'number'
        || typeof instance.currentElement === 'number'
        || typeof element === 'boolean'
        || typeof instance.currentElement === 'boolean'
        || instance.currentElement.type !== element.type
    ) {
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

        const nextChildrenElement: AlienElement = publicInstance.render();
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