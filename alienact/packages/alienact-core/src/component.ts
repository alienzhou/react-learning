import {
    Fiber,
    Props,
    State,
    FiberTag,
    AlienElement,
    InnerInstance
} from './types';
import {reconcile} from './reconciler';
import {pushToUpdateQueue} from './reconciler.fiber';

class Component<T = any, S = any> {
    static isAlienAct = {};
    props: T;
    state: S | {};
    innerInstance: InnerInstance;
    prevState: S | {} = null;
    pendingState: S | {} = null;
    __fiber: Fiber | null = null;

    constructor(props: T) {
        this.props = props;
        this.state = this.state || {};
    }

    syncStateIfNecessary() {
        // 处理初始化
        if (this.pendingState !== null) {
            this.state = Object.assign({}, this.pendingState);
            this.pendingState = null;
        }
    }

    componentDidMount() {}
    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {return true;}
    getSnapshotBeforeUpdate(prevProps: Props, prevState: State) {}
    componentDidUpdate(prevProps: Props, prevState: State, snapshot: any) {}
    componentWillUnmount() {}

    setState(partialState: State): void {
        this.prevState = Object.assign({}, this.state);
        this.pendingState = Object.assign({}, this.state, partialState);
        // this.state = Object.assign({}, this.state, partialState);
        this.update(partialState);
    }

    render(): AlienElement {
        console.error('you must implement your own render() function');
        return null;
    }

    // private update() {
    //     const parent = this.innerInstance.dom.parentNode as HTMLElement;
    //     const element = this.innerInstance.currentElement;
    //     reconcile(parent, this.innerInstance, element);
    // }

    private update(partialState: State) {
        pushToUpdateQueue({
            from: FiberTag.CLASS_COMPONENT,
            instance: this,
            partialState
        });
    }
}

export default Component;