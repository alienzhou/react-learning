// cSpell: ignore Alienact
import Alienact from 'alienact';
import TodoApp from '@src/components/todo';
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
                <a className="effect-link" href="/simple">查看基础示例</a>
            </div>
        </div>
	);
}