// cSpell: ignore Alienact
import Alienact from 'alienact';
import TodoApp from '@src/components/todo';
import {Link} from 'alienact-router';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';
import './index.less';

export default function () {
	return (
        <div>
            <section className="todoapp">
                <TodoApp />
            </section>
            <div className="link">
                <Link className="effect-link" to="/simple">查看基础示例</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link className="effect-link" to="/">回到首页</Link> ⬅️
            </div>
        </div>
	);
}