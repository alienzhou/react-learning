import Component from './component';
import createElement from './element';
import EventBus from './event.bus';
import {
    State,
    Props,
    AlienElement,
    FunctionComp
} from './types';

interface IProps extends Props {
    value: any
};

export default function createContext(defaultVal?: any) {
    const event = new EventBus();
    let contextValue = defaultVal;

    class Provider extends Component<IProps, State> {
        constructor(props: IProps) {
            super(props);

            if (props.value !== undefined) {
                contextValue = props.value;
            }
        }

        componentDidUpdate(prevProps: Props) {
            if (this.props.value !== prevProps.value) {
                debugger
                contextValue = this.props.value;
                event.emit(contextValue);
            }
        }

        render() {
            if (Array.isArray(this.props.children)) {
                return createElement('div', {}, ...this.props.children);
            }
            return this.props.children;
        }
    }

    class Consumer extends Component<Props, State> {
        static isContextConsumer = {};
        state = {value: contextValue};

        componentDidMount() {
            event.on(value => this.setState({value}))
        }

        render() {
            console.warn(this.state.value);
            const child = Array.isArray(this.props.children)
                ? this.props.children[0]
                : this.props.children;
            return ((child as AlienElement).type as FunctionComp)(this.state.value);
        }
    }

    return {
        Provider,
        Consumer
    }
}