// cSpell: ignore Alienact
import Alienact from 'alienact';
import TodoModel from './model';
import TodoFooter from './footer';
import TodoItem from './item';

const ENTER_KEY = 13;

const FILTERS = {
	all: todo => true,
	active: todo => !todo.completed,
	completed: todo => todo.completed
};

export default class App extends Alienact.Component {
	constructor() {
		super();
		this.model = new TodoModel('sample-todo', () => this.setState({}));
		addEventListener('hashchange', this.handleRoute.bind(this));
		let nowShowing = this.getRoute();
		this.state = {
			nowShowing,
			newTodo: '',
			editing: ''
		};
	}

	getRoute() {
		let nowShowing = String(location.hash || '').split('/').pop();
		if (!FILTERS[nowShowing]) {
			nowShowing = 'all';
		}
		return nowShowing;
	}

	handleRoute() {
		let nowShowing = this.getRoute();
		this.setState({nowShowing});
	}

	handleNewTodoKeyDown = e => {
		if (e.keyCode !== ENTER_KEY) {
            return;
        }
		e.preventDefault();

		const val = this.state.newTodo.trim();
		if (val) {
			this.model.addTodo(val);
			this.setState({ newTodo: '' });
		}
	};

	updateNewTodo = e => this.setState({newTodo: e.target.value});
	toggleAll = e => this.model.toggleAll(e.target.checked);
	toggle = todo => this.model.toggle(todo);
	destroy = todo => this.model.destroy(todo);
	edit = todo => this.setState({editing: todo.id});
    cancel = () => this.setState({editing: null});
    clearCompleted = () => this.model.clearCompleted();

	save = (todoToSave, text) => {
		this.model.save(todoToSave, text);
		this.setState({ editing: null });
	};

	render() {
		const {
            nowShowing = ALL_TODOS,
            newTodo,
            editing
        } = this.state;

		const todos = this.model.todos;
        const shownTodos = todos.filter(FILTERS[nowShowing]);
		const activeTodoCount = todos.reduce((a, todo) => a + (todo.completed ? 0 : 1), 0);
		const completedCount = todos.length - activeTodoCount;

		return (
			<div>
				<header className="header">
					<h1>todos</h1>
					<input
						className="new-todo"
						placeholder="What needs to be done?"
						value={newTodo}
						onKeyDown={this.handleNewTodoKeyDown}
						onInput={this.updateNewTodo}
						autoFocus={true}
					/>
				</header>

				{todos.length ? (
					<section className="main">
						<input
							className="toggle-all"
							type="checkbox"
							onChange={this.toggleAll}
							checked={activeTodoCount === 0}
						/>
						<ul className="todo-list">
							{shownTodos.map(todo => (
								<TodoItem
									todo={todo}
									onToggle={this.toggle}
									onDestroy={this.destroy}
									onEdit={this.edit}
									editing={editing === todo.id}
									onSave={this.save}
									onCancel={this.cancel}
								/>
							))}
						</ul>
					</section>
				) : null}

				{(activeTodoCount || completedCount) ? (
					<TodoFooter
						count={activeTodoCount}
						completedCount={completedCount}
						nowShowing={nowShowing}
						onClearCompleted={this.clearCompleted}
					/>
				) : null}
			</div>
		);
	}
}