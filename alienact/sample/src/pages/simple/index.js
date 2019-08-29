// cSpell: ignore Alienact
import Alienact from 'alienact';
import Item from '@src/components/item';
import ThemeContext from '@src/components/themeContext';
import './index.less';

class App extends Alienact.Component {
    constructor(props) {
        super(props);

        this.state = {
            total: 2,
            theme: 'dark',
            locked: false,
            tail: 1
        };
    }

    componentDidMount() {
        console.log('app did mount');
    }

    createRandoms = () => {
        const randoms = [];
        for (let i = 0; i < this.state.total; i++) {
            randoms.push((i + 1) + '-' + this.state.tail);
        }
        return randoms;
    }

    generate = () => {
        let total = this.state.total === 3 ? 1 : ++this.state.total;
        this.setState({total});
    }

    toggleTheme = () => {
        const theme = this.state.theme === 'dark' ? 'light' : 'dark';
        this.setState({theme});
    }

    modifyContent = () => this.setState({tail: Math.ceil(Math.random() * 50)});

    lock = () => this.setState({locked: !this.state.locked});

    shouldComponentUpdate(nextProps, nextState) {
        console.debug(nextState);
        const locked = (
            this.state.locked && nextState.locked
        );
        if (locked) {
            console.warn('⚠️ 由于触发了 shouldComponentUpdate (locked)，所以不会更新组件');
        }
        return !locked;
    }

    render() {
        const randoms = this.createRandoms();

        return (
            <ThemeContext.Provider value={this.state.theme}>
                <div className="simple">
                    <h1 className="simple-title" data-heading="alienact">alienact</h1>
                    <button className="btn" onClick={this.generate}>重新生成列表</button>
                    <button className="btn" onClick={this.modifyContent}>更新内容</button>
                    <button className="btn" onClick={this.toggleTheme}>切换主题</button>
                    <button className="btn" onClick={this.lock}>锁定</button>
                    <ul className={this.state.locked ? 'list locked' : 'list'}>
                        {randoms.map((text, idx) => <Item index={idx} text={text} />)}
                    </ul>
                    <a className="effect-link" href="/todo">查看 TODOMVC 示例</a>
                </div>
            </ThemeContext.Provider>
        );
    }
}

export default App;
