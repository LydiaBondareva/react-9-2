import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from './actions';
import styles from './App.module.css';
import TodoControlPanel from './components/todoControlPanel/TodoControlPanel';
import TodoList from './components/todoList/todoList';
import { selectError, selectIsLoading } from './selectors';

function App() {
	const isLoading = useSelector(selectIsLoading);
	const error = useSelector(selectError);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTodos());
	}, []);

	return (
		<>
			<TodoControlPanel />
			<TodoList />
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
