const initialState = {
	todos: [],
	newTodo: '',
	newTaskValue: '',
	error: '',
	isLoading: false,
	searchValue: '',
	isSorted: false,
};

export function reducer(state = initialState, action) {
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
		case 'ADD_TODO':
			return {
				...state,
				todos: [...state.todos, payload],
			};
		case 'SET_TODOS':
			return {
				...state,
				todos: payload,
			};
		case 'SET_NEW_TASK_VALUE':
			return {
				...state,
				newTaskValue: payload,
			};
		case 'DELETE_TODO':
			return {
				...state,
				todos: [...state.todos].filter((todo) => todo.id !== payload),
			};
		case 'REPLACE_TODO':
			return {
				...state,
				todos: [...state.todos].map((todo) =>
					todo.id === payload.id ? { ...todo, title: payload.newTaskValue } : todo,
				),
			};

		default:
			return state;
	}
}
