import { useState, useRef } from 'react';
import styles from './todoList.module.css';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import { setNewTaskValue } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectNewTaskValue, selectSearchValue } from '../../selectors';

export default function TodoList({ allTodos, changeTodo, deleteTodo }) {
	const changeInpRef = useRef(null);
	const [idToChange, setIdToChange] = useState('');
	const newTaskValue = useSelector(selectNewTaskValue);
	const searchValue = useSelector(selectSearchValue);

	const dispatch = useDispatch();

	function handleSubmit(event, id) {
		event.preventDefault();
		changeTodo(id);
		setIdToChange('');
	}

	function openEditInput(id, title) {
		setIdToChange(id);
		dispatch(setNewTaskValue(title));
		setTimeout(() => {
			if (changeInpRef.current) {
				changeInpRef.current.focus();
			}
		}, 0);
	}

	function onBlur(id) {
		changeTodo(id);
		setIdToChange('');
	}

	return (
		<ul className={styles.list}>
			{allTodos.map((todo) => (
				<li key={todo.id} className={styles['list-item']}>
					{idToChange !== todo.id ? (
						<span>{todo.title}</span>
					) : (
						<form onSubmit={(event) => handleSubmit(event, todo.id)}>
							<input
								ref={changeInpRef}
								value={newTaskValue}
								onChange={(event) => dispatch(setNewTaskValue(event.target.value))}
								onBlur={() => onBlur(todo.id)}
								type="text"
								className={styles.changeInp}
							/>
						</form>
					)}
					<div>
						<button
							onClick={() => openEditInput(todo.id, todo.title)}
							className={styles.editButton}
						>
							<FiEdit2 />
						</button>
						<button onClick={() => deleteTodo(todo.id)} className={styles.deleteButton}>
							<FiTrash2 />
						</button>
					</div>
				</li>
			))}
			{!allTodos.length &&
				searchValue &&
				'К сожалению, по данному запросу дел не обнаружено'}
		</ul>
	);
}
