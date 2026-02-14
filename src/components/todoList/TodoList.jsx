import { useRef, useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { changeTodo, deleteTodo, setNewTaskValue } from '../../actions';
import {
	selectIsSorted,
	selectNewTaskValue,
	selectSearchValue,
	selectTodos,
} from '../../selectors';
import { getChosenTodos } from '../../utils';
import styles from './todoList.module.css';

export default function TodoList() {
	const changeInpRef = useRef(null);
	const [idToChange, setIdToChange] = useState('');
	const newTaskValue = useSelector(selectNewTaskValue);
	const searchValue = useSelector(selectSearchValue);
	const todos = useSelector(selectTodos);
	const isSorted = useSelector(selectIsSorted);

	const chosenTodos = getChosenTodos(todos, searchValue, isSorted);

	const dispatch = useDispatch();

	function handleSubmit(event, id) {
		event.preventDefault();
		dispatch(changeTodo(id, newTaskValue));
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
		dispatch(changeTodo(id, newTaskValue));
		setIdToChange('');
	}

	return (
		<ul className={styles.list}>
			{chosenTodos.map((todo) => (
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
						<button
							onClick={() => dispatch(deleteTodo(todo.id))}
							className={styles.deleteButton}
						>
							<FiTrash2 />
						</button>
					</div>
				</li>
			))}
			{!chosenTodos.length &&
				searchValue &&
				'К сожалению, по данному запросу дел не обнаружено'}
		</ul>
	);
}
