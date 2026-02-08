import { getAll, post, remove, change } from './todosApi';

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

export const postTodo = (newTodo) => {
	return (dispatch) => {
		post(newTodo)
			.then((respTodo) => dispatch(addTodo(respTodo)))
			.finally(() => dispatch(setIsLoading(false)));
	};
};
export const getAllTodos = () => {
	return (dispatch) => {
		getAll()
			.then((newTodos) => dispatch(setTodos(newTodos)))
			.finally(() => dispatch(setIsLoading(false)));
	};
};
export const removeTodo = (id) => {
	return (dispatch) => {
		remove(id)
			.then(() => {
				dispatch(deletingTodo(id));
			})
			.finally(() => dispatch(setIsLoading(false)));
	};
};
export const replaceTodo = (id, newTaskValue) => {
	return (dispatch) => {
		change(id, newTaskValue)
			.then(() => {
				dispatch(replacingTodo({ id, newTaskValue }));
			})
			.finally(() => dispatch(setIsLoading(false)));
	};
};
