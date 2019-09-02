import {
    Handler,
    ILocation,
    IHistory
} from './types';

function getLocationObject(): ILocation {
    const location = window.location;
    return {
        pathname: location.pathname,
        search: location.search,
        hash: location.hash,
        state: null
    };
}

const nativeHistory = window.history;
let handler: Handler = null;

function emit(l: ILocation): void {
    typeof handler === 'function' && handler(l);
}

class History implements IHistory {
    private stack: ILocation[] = [getLocationObject()];

    constructor() {
        this._updateLocation = this._updateLocation.bind(this);
        window.addEventListener('popstate', this._updateLocation, false);
    }

    length: number = nativeHistory.length;
    action: string = '';
    location: ILocation = getLocationObject();
    base: string = '';

    private _updateLocation(): ILocation {
        const location = getLocationObject();
        this.location = location;
        emit(location);
        return location;
    }

    detachWindowListener() {
        window.removeEventListener('popstate', this._updateLocation);
    }

    on(h: Handler): Function {
        handler = h;

        return () => {handler = null};
    }

    push(path: string, state?: any) {
        nativeHistory.pushState(state, '', this.base + path);
        this.action = 'PUSH';

        const location: ILocation = this._updateLocation();
        // 更新部分内部值
        this.stack.push(location);
        this.length = this.stack.length;
    }

    replace(path: string, state?: any) {
        nativeHistory.replaceState(state, '', this.base + path);
        this.action = 'REPLACE';

        this._updateLocation();
    }

    go(n: number) {
        nativeHistory.go(n);
        if (n !== 0) {
            this.action = n > 0 ? 'POP' : 'PUSH';
        }

        this._updateLocation();
    }

    goBack() {
        nativeHistory.back();
        this.action = 'POP';

        this._updateLocation();
    }

    goForward() {
        nativeHistory.forward();
        this.action = 'PUSH';

        this._updateLocation();
    }
}

export default new History();