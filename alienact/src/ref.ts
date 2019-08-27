import {Ref} from './types';

export default function createRef(): Ref {
    const ref: Ref = {
        current: null
    };
    return ref;
}
