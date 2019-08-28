// cSpell: ignore Alienact
import Alienact from 'alienact';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

export default class TodoItem extends Alienact.Component {
	handleSubmit = () => {
		const {onSave, onDestroy, todo} = this.props;
		const val = this.state.editText.trim();
		if (val) {
			onSave(todo, val);
			this.setState({editText: val});
		}
		else {
			onDestroy(todo);
		}
	};

	handleEdit = () => {
		const {onEdit, todo} = this.props;
		onEdit(todo);
		this.setState({ editText: todo.title });
	};

	toggle = e => {
		const {onToggle, todo} = this.props;
		onToggle(todo);
		e.preventDefault();
	};

	handleKeyDown = e => {
		if (e.which === ESCAPE_KEY) {
			const todo = this.props.todo;
			this.setState({
                editText: todo.title
            });
			this.props.onCancel(todo);
		}
		else if (e.which === ENTER_KEY) {
			this.handleSubmit();
		}
	};

	handleDestroy = () => this.props.onDestroy(this.props.todo);

	updateEditText = e => this.setState({editText: e.target.value });

	// shouldComponentUpdate({ todo, editing, editText }) {
	// 	return (
	// 		todo !== this.props.todo ||
	// 		editing !== this.props.editing ||
	// 		editText !== this.state.editText
	// 	);
	// }

	render() {
		const {
            todo:{
                title,
                completed
            },
            onToggle,
            onDestroy,
            editing
        } = this.props;
		const editText = this.state.editText;
		let className = completed ? 'completed' : '';
		className += editing ? ' editing' : '';

		return (
			<li className={className}>
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={completed}
						onChange={this.toggle}
					/>
					<label onDblClick={this.handleEdit}>{title}</label>
					<button className="destroy" onClick={this.handleDestroy} />
				</div>
				{editing && (
					<input
						className="edit"
						autoFocus
						value={editText}
						onBlur={this.handleSubmit}
						onInput={this.updateEditText}
						onKeyDown={this.handleKeyDown}
					/>
				)}
			</li>
		);
	}
}