import {NativeRender} from './types';

let nativeRender: NativeRender = {
    createNativeTextNode: null,
    createNativeElementNode: null,
    updateNativeProperties: null
};

export function inject(specifyRender: NativeRender): void {
    Object.keys(specifyRender).forEach((name: keyof NativeRender) => {
        if (Object.prototype.hasOwnProperty.call(nativeRender, name)) {
            nativeRender[name] = specifyRender[name];
        }
    })
    nativeRender = Object.assign(nativeRender, specifyRender);
}

export function retrieveRender(): NativeRender {
    return nativeRender;
}