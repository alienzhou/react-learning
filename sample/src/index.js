import React, {createElement} from 'react';
import ReactDOM from 'react-dom';
import Container from './components/container';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shown: true,
            prefix: '00'
        };

        this.handleClick = this.handleClick.bind(this);
        this.modifyPrefix = this.modifyPrefix.bind(this);
    }

    handleClick() {
        this.setState({
            shown: !this.state.shown
        });
    }

    modifyPrefix() {
        this.setState({
            prefix: Math.random().toFixed(2)
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>挂载/卸载</button>
                <button onClick={this.modifyPrefix}>修改前缀</button>
                {this.state.shown && <Container prefix={this.state.prefix} />}
            </div>
        );
    }
}

ReactDOM.render(
    createElement(
        App
    ),
    document.getElementById('root')
);
