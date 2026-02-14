import { change, getAll, post, remove } from './todosApi';

export const setIsSorted = (delta) => ({ type: 'SET_IS_SORTED', payload: delta });
export const setSearchValue = (delta) => ({ type: 'SET_SEARCH_VALUE', payload: delta });
export const setNewTodo = (delta) => ({ type: 'SET_NEW_TODO', payload: delta });
export const setIsLoading = (delta) => ({ type: 'SET_IS_LOADING', payload: delta });
export const setNewTaskValue = (delta) => ({
	type: 'SET_NEW_TASK_VALUE',
	payload: delta,
});
export const setError = (delta) => ({ type: 'SET_ERRROR', payload: delta });
export const addTodo = (delta) => ({ type: 'ADD_TODO', payload: delta });
export const deletingTodo = (delta) => ({ type: 'DELETE_TODO', payload: delta });
export const replacingTodo = (delta) => ({ type: 'REPLACE_TODO', payload: delta });
export const setTodos = (delta) => ({ type: 'SET_TODOS', payload: delta });

export const getTodos = () => {
	return (dispatch) => {
		try {
			dispatch(setIsLoading(true));
			getAll()
				.then((newTodos) => dispatch(setTodos(newTodos)))
				.finally(() => dispatch(setIsLoading(false)));
		} catch (error) {
			dispatch(setError('Не удалось загрузить список дел'));
			dispatch(setIsLoading(false));
		}
	};
};

export const createTodo = (newTodo) => {
	return (dispatch) => {
		try {
			if (newTodo === '') {
				dispatch(setError('Введите название задачи!'));
				return;
			}
			dispatch(setError(''));
			dispatch(setIsLoading(true));
			post(newTodo)
				.then((respTodo) => dispatch(addTodo(respTodo)))
				.finally(() => dispatch(setIsLoading(false)));
			dispatch(setNewTodo(''));
		} catch (error) {
			dispatch(setError('Не удалось создать задачу'));
			dispatch(setIsLoading(false));
		}
	};
};

export const deleteTodo = (id) => {
	return (dispatch) => {
		try {
			dispatch(setIsLoading(true));
			remove(id)
				.then(() => {
					dispatch(deletingTodo(id));
				})
				.finally(() => dispatch(setIsLoading(false)));
		} catch (error) {
			dispatch(setError('Не удалось удалить задачу'));
			dispatch(setIsLoading(false));
		}
	};
};

export const changeTodo = (id, newTaskValue) => {
	return (dispatch) => {
		try {
			dispatch(setIsLoading(true));
			change(id, newTaskValue)
				.then(() => {
					dispatch(replacingTodo({ id, newTaskValue }));
				})
				.finally(() => dispatch(setIsLoading(false)));
		} catch (error) {
			dispatch(setError('Не удалось изменить задачу'));
			dispatch(setIsLoading(false));
		}
	};
};
