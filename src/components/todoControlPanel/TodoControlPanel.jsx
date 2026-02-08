import { useDispatch, useSelector } from 'react-redux';
import styles from './TodoControlPanel.module.css';
import { setIsSorted, setNewTodo, setSearchValue } from '../../actions';
import { selectIsSorted, selectNewTodo, selectSearchValue } from '../../selectors';

export default function TodoControlPanel({
	// newTodo,
	// setNewTodo,
	createTodo,
	// searchValue,
	// sorted,
	allTodos,
}) {
	const newTodo = useSelector(selectNewTodo);
	const searchValue = useSelector(selectSearchValue);
	const isSorted = useSelector(selectIsSorted);

	function handleSubmit(event) {
		event.preventDefault();
		createTodo();
	}

	const dispatch = useDispatch();

	return (
		<>
			<h1>Todos:</h1>
			<form onSubmit={handleSubmit} className={styles.сontainer}>
				<input
					className={styles.addTodo}
					placeholder="Введите новое дело..."
					value={newTodo}
					onChange={(event) => dispatch(setNewTodo(event.target.value))}
				/>
				<button type="submit" className={styles.addBtn}>
					Добавить в список
				</button>
			</form>
			<div className={styles.сontainer}>
				<input
					onChange={(event) => dispatch(setSearchValue(event.target.value))}
					className={styles.search}
					placeholder="Введите текст для поиска..."
					value={searchValue}
				/>
			</div>
			<button
				className={styles.searchBtn}
				onClick={() => dispatch(setIsSorted(!isSorted))}
				disabled={allTodos.length < 2}
			>
				{isSorted ? 'Отменить сортировку' : 'Сортировать по алфавиту'}
			</button>
		</>
	);
}
