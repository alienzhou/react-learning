// cSpell: ignore Alienact
import Alienact from 'alienact';
import ThemeContext from '../themeContext';
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
            <ThemeContext.Consumer>
                {value => (
                    <div className={'count-item ' + value}>
                        <div>现在的数量是: {this.state.count}</div>
                        <button onClick={this.handleClick}>加一</button>
                    </div>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default Count;