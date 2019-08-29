// cSpell: ignore Alienact
import Alienact from 'alienact';
import {pluralize} from './util';

export default function (props) {
	const {
        nowShowing,
        count,
        completedCount,
        onClearCompleted
    } = props;

	return (
		<footer className="footer">
			<span className="todo-count">
				<strong>{count}</strong> {pluralize(count, 'item')} left
			</span>
			<ul className="filters">
				<li>
					<a href="#/" className={nowShowing=='all' && 'selected'}>All</a>
				</li>
                &nbsp;
				<li>
					<a href="#/active" className={nowShowing=='active' && 'selected'}>Active</a>
				</li>
                &nbsp;
				<li>
					<a href="#/completed" className={nowShowing=='completed' && 'selected'}>Completed</a>
				</li>
			</ul>
			{completedCount > 0 && (
				<button className="clear-completed" onClick={onClearCompleted}>
					Clear completed
				</button>
			)}
		</footer>
	);
}