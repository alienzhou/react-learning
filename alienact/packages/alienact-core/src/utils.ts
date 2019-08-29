import {Node} from './types';

export const isListenerPropName = (name: string) => name.startsWith('on');

export const isAttrPropName = (name: string) => (
    name !== 'children'
    && !isListenerPropName(name)
);

export const convertPropNameToEventName = (name: string) => (
    isListenerPropName(name) ? name.slice(2).toLowerCase() : ''
);

export const isClass = (ele: Node) => (
    typeof ele !== 'string'
    && ele.type
    && (ele.type as any).isAlienAct
);

export const isFunc = (ele: Node) => (
    typeof ele !== 'string'
    && ele.type
    && typeof ele.type === 'function'
    && !(ele.type as any).isAlienAct
);

const IF_PROPS_NEED_MAP: any = {
    className: 'class'
};

export const propsMapping = (name: string): string => {
    if (IF_PROPS_NEED_MAP[name]) {
        return IF_PROPS_NEED_MAP[name];
    }
    return name;
}