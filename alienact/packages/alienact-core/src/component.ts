import {
    Props,
    State,
    AlienElement,
    InnerInstance
} from './types';
import {reconcile} from './reconciler';

class Component {
    static isAlienAct = {};
    props: Props;
    state: State;
    innerInstance: InnerInstance;
    prevState: Props = null;
    pendingState: Props = null;

    constructor(props: Props) {
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
        this.update();
    }

    render(): AlienElement {
        console.error('you must implement your own render() function');
        return null;
    }

    private update() {
        const parent = this.innerInstance.dom.parentNode as HTMLElement;
        const element = this.innerInstance.currentElement;
        reconcile(parent, this.innerInstance, element);
    }
}

export default Component;