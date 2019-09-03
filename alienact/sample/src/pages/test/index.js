// cSpell: ignore Alienact
import Alienact from 'alienact';
import '../simple/index.less';

class TestApp extends Alienact.Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 1
        };
    }

    handleClick = () => this.setState({count: this.state.count + 1});

    render() {
        return (
            <div className="simple">
                <div>{this.state.count}</div>
                <button onClick={this.handleClick}>+ 1</button>
            </div>
        );
    }
}

export default TestApp;
