import { emptyField } from './data';

const initialState = {
	currentPlayer: 'X',
	field: emptyField,
	isDraw: false,
	isGameEnded: false,
};

export const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'SET_CURRENT_PLAYER':
			return {
				...state,
				currentPlayer: payload,
			};
		case 'SET_FIELD':
			return {
				...state,
				field: payload,
			};
		case 'SET_GAME_END_STATUS':
			return {
				...state,
				isGameEnded: payload,
			};
		case 'SET_DRAW_STATUS':
			return {
				...state,
				isDraw: payload,
			};
		case 'RESTART_GAME':
			return initialState;
		default:
			return state;
	}
};
