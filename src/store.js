import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { allStateReducer, todosReducer } from './reducer';

const reducer = combineReducers({
	allState: allStateReducer,
	todosState: todosReducer,
});

export const store = configureStore({
	reducer: reducer,
});
