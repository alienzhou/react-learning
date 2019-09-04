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
    const event = new EventBus(String(+new Date));
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
                console.warn('componentDidUpdate', this);
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
        ts: number;
        constructor(props: Props) {
            console.warn('consumer');
            super(props);
            this.ts = +new Date();
            this.state = {value: contextValue};
            this.handleChange = this.handleChange.bind(this);
        }

        handleChange(value: any): void {
            console.warn(this.ts, 'here');
            this.setState({value});
        }

        componentDidMount() {
            console.warn(this.ts ,'componentDidMount');
            event.on(this.handleChange);
        }

        componentWillUnmount() {
            console.warn(this.ts ,'componentWillUnmount');
            event.off(this.handleChange);
        }

        render() {
            const child = Array.isArray(this.props.children)
                ? this.props.children[0]
                : this.props.children;
            return ((child as AlienElement).type as FunctionComp)(contextValue);
        }
    }

    return {
        Provider,
        Consumer
    }
}