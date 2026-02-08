const initialAllState = {
	newTodo: '',
	newTaskValue: '',
	error: '',
	isLoading: false,
	searchValue: '',
	isSorted: false,
};

const initialTodosState = [];

export function allStateReducer(state = initialAllState, action) {
	const { type, payload } = action;
	switch (type) {
		case 'SET_IS_SORTED':
			return {
				...state,
				isSorted: payload,
			};
		case 'SET_SEARCH_VALUE':
			return {
				...state,
				searchValue: payload,
			};
		case 'SET_NEW_TODO':
			return {
				...state,
				newTodo: payload,
			};
		case 'SET_IS_LOADING':
			return {
				...state,
				isLoading: payload,
			};
		case 'SET_ERRROR':
			return {
				...state,
				error: payload,
			};

		case 'SET_NEW_TASK_VALUE':
			return {
				...state,
				newTaskValue: payload,
			};

		default:
			return state;
	}
}

export function todosReducer(state = initialTodosState, action) {
	const { type, payload } = action;
	switch (type) {
		case 'SET_TODOS':
			return payload;

		case 'ADD_TODO':
			return [...state, payload];

		case 'DELETE_TODO':
			return [...state.filter((todo) => todo.id !== payload)];

		case 'REPLACE_TODO':
			return [
				...state.map((todo) =>
					todo.id === payload.id ? { ...todo, title: payload.newTaskValue } : todo,
				),
			];

		default:
			return state;
	}
}
