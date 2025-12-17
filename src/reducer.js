import { ORDER } from './constants';

const initialState = {
	order: ORDER.id_asc,
	searchItem: '',
	isSorted: false,
	newTodo: '',
};

export const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'SET_SEARCH_ITEM':
			return {
				...state,
				searchItem: payload,
			};
		case 'SET_ORDER':
			return {
				...state,
				order: payload,
			};
		case 'SET_SORT_STATUS':
			return {
				...state,
				isSorted: payload,
			};
		case 'SET_TODO':
			return {
				...state,
				newTodo: payload,
			};
		case 'RESTART_GAME':
			return initialState;
		default:
			return state;
	}
};
