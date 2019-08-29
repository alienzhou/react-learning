// cSpell: ignore alienact
import Alienact from 'alienact';
import {Link} from 'alienact-router';
import './index.less';

export default class Home extends Alienact.Component {
    render() {
        return (
            <div className="links">
                <h2 className="links-title">导航</h2>
                <ul className="links-list">
                    <li>
                        <Link className="effect-link" to="/simple">基础示例</Link>
                    </li>
                    <li>
                        <Link className="effect-link" to="/todo">TODO MVC 示例</Link>
                    </li>
                </ul>
            </div>
        )
    }
}
