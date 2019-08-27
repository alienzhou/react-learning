import Component from './component';

export interface NativeRender {
    createNativeTextNode: Function;
    createNativeElementNode: Function;
    updateNativeProperties: Function;
}

export interface ComponentCtor {
    isAlienAct: any;
    new (props: Props): Component;
}
export type FunctionComp = (props: Props) => AlienElement;
export type HTMLTagName = keyof HTMLElementTagNameMap;
export type ComponentType = HTMLTagName | ComponentCtor | FunctionComp;

export type DOM = HTMLElement | Text;

export type State = any;
export interface Props extends Object {
    children?: Node[],
    [propName: string]: any
}
export interface AlienElement {
    type: ComponentType,
    props: Props
}

export type Node = AlienElement | string;

export interface InnerInstance {
    currentElement: Node,
    publicInstance?: Component,
    childrenInstance: InnerInstance[],
    dom: DOM
}

export interface Ref {
    current: any
}
