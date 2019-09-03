import Component from './component';

export interface NativeRender {
    createNativeTextNode: Function;
    createNativeElementNode: Function;
    updateNativeProperties: Function;
}

export interface ComponentCtor {
    isAlienAct: any;
    new (props: Props): Component<Props, State>;
}
export type FunctionComp = (props: Props) => AlienElement;
export type HTMLTagName = keyof HTMLElementTagNameMap;
export const TEXT_NODE = 'TEXT_NODE';
export type ComponentType = HTMLTagName | ComponentCtor | FunctionComp | 'TEXT_NODE';

export interface FiberDOMExtend {
    __rootContainerFiber?: Fiber;
}
export type DOM = (HTMLElement | Text) & FiberDOMExtend;

export type State = any;
export interface Props extends Object {
    children?: AlienElement[],
    [propName: string]: any
}
export interface AlienElement {
    type: ComponentType,
    props: Props
}

export interface InnerInstance {
    currentElement: AlienElement,
    publicInstance?: Component<Props, State>,
    childrenInstance: InnerInstance[],
    dom: DOM
}

export interface Ref {
    current: any
}

/** below is some types for fiber */
export enum FiberTag {
    HOST_COMPONENT = 'host',
    CLASS_COMPONENT = 'class',
    FUNCTION_COMPONENT = 'function',
    HOST_ROOT = 'root',
}

export enum FiberEffectTag {
    PLACEMENT = 'placement',
    DELETION = 'deletion',
    UPDATE = 'update',
}

export interface FiberTask {
    from: FiberTag;
    dom?: DOM;
    instance?: Component<any, any>;
    partialState?: State;
    newProps?: Props;
}

export interface IdleDeadline {
    didTimeout: boolean;
    timeRemaining: () => DOMHighResTimeStamp;
}

export type TaskCallbackFunction = (d: IdleDeadline) => void;
export type TaskCallback = (cb: TaskCallbackFunction) => void;

export interface Fiber {
    tag: FiberTag;
    type?: ComponentType;

    return?: Fiber | null;
    child?: Fiber | null;
    sibling?: Fiber | null;

    alternate?: Fiber | null;
    stateNode?: DOM | Component<any, any>;

    props: Props;
    partialState?: State;

    effectTag?: FiberEffectTag;
    effects?: Fiber[];
}
/** above is some types for fiber */
