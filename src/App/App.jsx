import { useDispatch } from 'react-redux';
import { AppLayout } from './AppLayout';

export const App = () => {
	const dispatch = useDispatch();

	const restart = () => {
		dispatch({type: 'RESTART_GAME'});
	};

	return <AppLayout restart={restart} />;
};
