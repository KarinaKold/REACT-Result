import { useEffect, useState } from 'react';
import { AppLayout } from './AppLayout';
import { store } from '../store';

export const App = () => {
	const [_, setStoreData] = useState(store.getState());

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setStoreData(store.getState());
		});
		return unsubscribe;
	}, []);

	const restart = () => {
		store.dispatch({ type: 'RESTART_GAME' });
	};

	return <AppLayout restart={restart} />;
};
