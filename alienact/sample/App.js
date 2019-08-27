// cSpell: ignore Alienact
import './index.less';
import Alienact from 'alienact';
import Item from './components/item';

class App extends Alienact.Component {
    constructor(props) {
        super(props);

        this.state = {
            total: 5,
            range: 75
        };

        this.generate = this.generate.bind(this);
        this.modifyContent = this.modifyContent.bind(this);
    }

    componentDidMount() {
        console.log('app did mount');
    }

    generate() {
        this.setState({
            total: Math.ceil(Math.random() * 5) + 2
        });
    }

    modifyContent() {
        this.setState({
            range: Math.ceil(Math.random() * 50) + 50
        });
    }

    render() {
        const randoms = [];
        for (let i = 0; i < this.state.total; i++) {
            randoms.push(Math.ceil(Math.random() * this.state.range));
        }

        return (
            <div>
                <button class="btn" onClick={this.generate}>重新生成列表</button>
                <button class="btn" onClick={this.modifyContent}>更新内容</button>
                <ul class="list">
                    {randoms.map((text, idx) => <Item index={idx} text={text} />)}
                </ul>
            </div>
        );
    }
}

Alienact.render(<App />, document.getElementById('root'));
