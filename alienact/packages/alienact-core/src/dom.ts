import {
    DOM,
    Node,
    Props,
    InnerInstance
} from './types';

import {
    propsMapping,
    isAttrPropName,
    isListenerPropName,
    convertPropNameToEventName
} from './utils';

import {reconcile} from './reconciler';
import {inject} from './inject';

const rootMap: WeakMap<HTMLElement, InnerInstance> = new WeakMap();

export function render(node: Node, parent: HTMLElement) {
    let rootInstance = rootMap.get(parent) ? rootMap.get(parent) : null;
    let prevInstance = rootInstance;
    let nextInstance = reconcile(parent, prevInstance, node);
    rootMap.set(parent, nextInstance);

    return;
}

function createNativeTextNode(text: string) {
    return document.createTextNode(text);
}

function createNativeElementNode(type: string) {
    return document.createElement(type);
}

function filterKeys(props: Props): string[] {
    return Object.keys(props).filter(name => name !== 'ref');
}

function updateNativeProperties(
    dom: DOM,
    prevProps: Props = {},
    nextProps: Props = {}
): void {
    filterKeys(prevProps).forEach(propName => {
        if (nextProps.hasOwnProperty(propName)) {
            return;
        }

        // 删除不存在的属性
        if (isAttrPropName(propName) && dom instanceof HTMLElement) {
            // 一些特殊属性名进行映射
            dom.removeAttribute(propsMapping(propName));
        }
        else if (isListenerPropName(propName)) {
            const eventName: string = convertPropNameToEventName(propName);
            dom.removeEventListener(eventName, prevProps[propName]);
        }
    });

    filterKeys(nextProps).forEach(propName => {
        if (prevProps[propName] === nextProps[propName]) {
            return;
        }

        if (isAttrPropName(propName) && dom instanceof HTMLElement) {
            // 一些特殊属性名进行映射
            dom.setAttribute(propsMapping(propName), nextProps[propName]);
        }
        else if (isListenerPropName(propName)) {
            const eventName: string = convertPropNameToEventName(propName);
            if (prevProps.hasOwnProperty(propName)) {
                dom.removeEventListener(eventName, prevProps[propName]);
            }
            dom.addEventListener(eventName, nextProps[propName]);
        }
    });
}

// 依赖注入
inject({
    createNativeElementNode,
    createNativeTextNode,
    updateNativeProperties
});