// cSpell: ignore Alienact
import Alienact from 'alienact';
import Item from '@src/components/item';
import './index.less';

class App extends Alienact.Component {
    constructor(props) {
        super(props);

        this.state = {
            total: 2,
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
            total: Math.ceil(Math.random() * 4)
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
            <div className="simple">
                <h1 className="simple-title" data-heading="alienact">alienact</h1>
                <button className="btn" onClick={this.generate}>重新生成列表</button>
                <button className="btn" onClick={this.modifyContent}>更新内容</button>
                <ul className="list">
                    {randoms.map((text, idx) => <Item index={idx} text={text} />)}
                </ul>
                <a className="effect-link" href="/todo">查看 TODOMVC 示例</a>
            </div>
        );
    }
}

export default App;
