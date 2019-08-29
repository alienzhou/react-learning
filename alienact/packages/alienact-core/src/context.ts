import Component from './component';
import EventBus from './event.bus';
import {
    Props,
    AlienElement,
    FunctionComp
} from './types';

export default function createContext(defaultVal?: any) {
    const event = new EventBus();
    let contextValue = defaultVal;

    class Provider extends Component {
        constructor(props: Props) {
            super(props);

            if (props.value !== undefined) {
                contextValue = props.value;
            }
        }

        componentDidUpdate(prevProps: Props) {
            if (this.props.value != prevProps.value) {
                contextValue = this.props.value;
                event.emit(contextValue);
            }
        }

        render() {
            const child = Array.isArray(this.props.children)
                ? this.props.children[0]
                : this.props.children;
            return child as AlienElement;
        }
    }

    class Consumer extends Component {
        state = {value: contextValue};

        componentDidMount() {
            event.on(value => this.setState({value}))
        }

        render() {
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