// cSpell: ignore Alienact
import Alienact from 'alienact';
import Count from '../count';
import './index.less';

class Item extends Alienact.Component {
    constructor(props) {
        super(props);

        this.state = {
            colorful: false
        };

        this.toggleColorful = this.toggleColorful.bind(this);
        this.showRefs = this.showRefs.bind(this);

        this.countRef = Alienact.createRef();
        this.buttonRef = Alienact.createRef();
    }

    componentDidMount() {
        console.log('item did mount');

        this.showRefs();
    }

    componentWillUnmount() {
        console.log('item will unmout');
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log(prevProps.index + ' - ' + prevState.colorful)
        return prevProps.index + ' - ' + prevState.colorful;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(`item ${this.props.index} prevProps is:`);
        console.table(prevProps);

        console.log(`item ${this.props.index} prevState is:`);
        console.table(prevState);

        console.log('snapshot is', snapshot);
    }

    toggleColorful() {
        this.setState({
            colorful: !this.state.colorful
        });
    }

    showRefs() {
        console.log('button\' ref:');
        console.log(this.buttonRef);

        console.log('count component\' ref:');
        console.log(this.countRef);
    }

    shouldComponentUpdate(prevProps, prevState) {
        console.debug(prevState);
        const needUpdate = Number(prevProps.text) > 60;
        if (!needUpdate) {
            console.warn('⚠️ 由于触发了 shouldComponentUpdate，所以不会更新组件');
        }
        return needUpdate;
    }

    render() {
        const colorful = this.state.colorful;
        return (
            <li className="item">
                <button onClick={this.showRefs}>在控制台打印 ref</button>
                <button ref={this.buttonRef} onClick={this.toggleColorful}>{colorful ? '黑白' : '彩色'}</button>
                <span className={colorful ? 'colorful' : ''}>{this.props.text}</span>
                <Count ref={this.countRef} />
            </li>
        );
    }
}

export default Item;