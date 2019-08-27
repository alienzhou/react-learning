// cSpell: ignore Alienact
import Alienact from 'alienact';
import './index.less';

class Count extends Alienact.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        console.log('count did mount');
    }

    componentWillUnmount() {
        console.log('count will unmount');
    }

    handleClick() {
        this.setState({
            count: this.state.count + 1
        });
    }

    render() {
        return (
            <div class="count-item">
                <div>现在的数量是: {this.state.count}</div>
                <button onClick={this.handleClick}>加一</button>
            </div>
        );
    }
}

export default Count;