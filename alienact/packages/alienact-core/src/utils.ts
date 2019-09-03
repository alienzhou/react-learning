import {
    AlienElement,
    TEXT_NODE,
    TaskCallback,
    TaskCallbackFunction
} from './types';

export const isListenerPropName = (name: string) => name.startsWith('on');

export const isAttrPropName = (name: string) => (
    name !== 'children'
    && !isListenerPropName(name)
);

export const convertPropNameToEventName = (name: string) => (
    isListenerPropName(name) ? name.slice(2).toLowerCase() : ''
);

export const isTextByType = (type: any) => type === TEXT_NODE;
export const isClassByType = (type: any) => type && type.isAlienAct;
export const isFuncByType = (type: any) => type && typeof type === 'function' && !type.isAlienAct;

export const isText = (ele: AlienElement) => isTextByType(ele.type);
export const isClass = (ele: AlienElement) => isClassByType(ele.type);
export const isFunc = (ele: AlienElement) => isFuncByType(ele.type);

export const standardElement = (ele: string | number | boolean | AlienElement): AlienElement => {
    if (typeof ele === 'string') {
        return {
            type: TEXT_NODE,
            props: {
                text: ele
            }
        };
    }
    // 将数字类型标准化为 text
    else if (typeof ele === 'number') {
        return {
            type: TEXT_NODE,
            props: {
                text: String(ele)
            }
        };
    }
    // boolean 型渲染为空
    else if (typeof ele === 'boolean') {
        return {
            type: TEXT_NODE,
            props: {
                text: ''
            }
        };
    }
    else {
        return ele;
    }
}

const IF_PROPS_NEED_MAP: any = {
    className: 'class'
};

export const propsMapping = (name: string): string => {
    if (IF_PROPS_NEED_MAP[name]) {
        return IF_PROPS_NEED_MAP[name];
    }
    return name;
}

export const requestTaskCallback: TaskCallback = (cb: TaskCallbackFunction): void => {
    const global: any = window;
    global.requestIdleCallback(cb)
};