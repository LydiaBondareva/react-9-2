import { useDispatch, useSelector } from 'react-redux';
import { createTodo, setIsSorted, setNewTodo, setSearchValue } from '../../actions';
import { selectIsSorted, selectNewTodo, selectSearchValue } from '../../selectors';
import styles from './TodoControlPanel.module.css';

export default function TodoControlPanel() {
	const newTodo = useSelector(selectNewTodo);
	const searchValue = useSelector(selectSearchValue);
	const isSorted = useSelector(selectIsSorted);
	const dispatch = useDispatch();

	function handleSubmit(event) {
		event.preventDefault();
		dispatch(createTodo(newTodo));
	}

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
			>
				{isSorted ? 'Отменить сортировку' : 'Сортировать по алфавиту'}
			</button>
		</>
	);
}
