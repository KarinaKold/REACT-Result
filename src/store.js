import { useState } from 'react';

const initialDataState = {
	email: '',
	password: '',
	confirmPassword: '',
};

export const useStore = () => {
	const [state, setState] = useState(initialDataState);
	return {
		getState: () => state,
		updateState: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue });
		},
		resetState: () => setState(initialDataState),
	};
};
