import { useEffect } from 'react';
import TodoList from './components/todoList/todoList';
import TodoControlPanel from './components/todoControlPanel/TodoControlPanel';
import styles from './App.module.css';
import useTodos from './hooks/useTodos';
import { useSelector } from 'react-redux';
import {
	selectError,
	selectIsLoading,
	selectIsSorted,
	selectSearchValue,
	selectTodos,
} from './selectors';

function App() {
	const searchValue = useSelector(selectSearchValue);
	const isSorted = useSelector(selectIsSorted);
	const todos = useSelector(selectTodos);
	const isLoading = useSelector(selectIsLoading);
	const error = useSelector(selectError);

	const { getTodos, createTodo, changeTodo, deleteTodo } = useTodos();

	const filteredTodos = todos.filter((task) => task.title?.includes(searchValue));
	const filteredAndSortedTodos = filteredTodos.toSorted((a, b) => {
		if (a.title > b.title) {
			return 1;
		} else if (a.title < b.title) {
			return -1;
		} else return 0;
	});

	let allTodos = !isSorted ? filteredTodos : filteredAndSortedTodos;

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<>
			<TodoControlPanel createTodo={createTodo} allTodos={allTodos} />
			<TodoList allTodos={allTodos} changeTodo={changeTodo} deleteTodo={deleteTodo} />
			{isLoading && (
				<div className={styles['spinner-container']}>
					<div className={styles.spinner}></div>
				</div>
			)}
			{error && <div className={styles.error}>{error}</div>}
		</>
	);
}

export default App;
