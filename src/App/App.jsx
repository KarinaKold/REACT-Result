import { useDispatch } from 'react-redux';
import { AppLayout } from './AppLayout';
import { RESTART_GAME } from '../actions';

export const App = () => {
	const dispatch = useDispatch();

	const restart = () => {
		dispatch(RESTART_GAME);
	};

	return <AppLayout restart={restart} />;
};
