import { useDispatch, useSelector } from 'react-redux';
import {
	getAllTodos,
	postTodo,
	setError,
	setIsLoading,
	setNewTodo,
	removeTodo,
	replaceTodo,
} from '../actions';
import { selectNewTaskValue, selectNewTodo } from '../selectors';

export default function useTodos() {
	const dispatch = useDispatch();
	const newTodo = useSelector(selectNewTodo);
	const newTaskValue = useSelector(selectNewTaskValue);

	function getTodos() {
		try {
			dispatch(setIsLoading(true));
			dispatch(getAllTodos());
		} catch (error) {
			dispatch(setError('Не удалось загрузить список дел'));
			dispatch(setIsLoading(false));
		}
	}

	function createTodo() {
		try {
			if (newTodo === '') {
				dispatch(setError('Введите название задачи!'));
				return;
			}
			dispatch(setError(''));
			dispatch(setIsLoading(true));
			dispatch(postTodo(newTodo));
			dispatch(setNewTodo(''));
		} catch (error) {
			dispatch(setError('Не удалось создать задачу'));
			dispatch(setIsLoading(false));
		}
	}

	function deleteTodo(id) {
		try {
			dispatch(setIsLoading(true));
			dispatch(removeTodo(id));
		} catch (error) {
			dispatch(setError('Не удалось удалить задачу'));
			dispatch(setIsLoading(false));
		}
	}

	function changeTodo(id) {
		try {
			dispatch(setIsLoading(true));
			dispatch(replaceTodo(id, newTaskValue));
		} catch (error) {
			dispatch(setError('Не удалось изменить задачу'));
			dispatch(setIsLoading(false));
		}
	}

	return {
		getTodos,
		createTodo,
		changeTodo,
		deleteTodo,
	};
}
