export const initialDataState = {
	data: [],
	loading: false,
	error: null,
};

export const dataReducer = (state = initialDataState, { type, payload }) => {
	switch (type) {
		case 'FETCH_DATA_REQUEST':
			return {
				...state,
				loading: true,
				error: null,
			};
		case 'FETCH_DATA_SUCCESS':
			return {
				...state,
				loading: false,
				data: payload,
			};
		case 'FETCH_DATA_FAILURE':
			return {
				...state,
				loading: false,
				error: payload,
			};
		case 'CREATE_DATA':
			return {
				...state,
				data: [...state.data, payload],
			};
		case 'UPDATE_DATA':
			return {
				...state,
				data: state.data.map((todo) => (todo.id === payload.id ? payload : todo)),
			};
		case 'DELETE_DATA':
			return {
				...state,
				data: state.data.filter((todo) => todo.id !== payload),
			};
		default:
			return state;
	}
};
