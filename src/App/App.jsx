import { useEffect, useState } from 'react';
import { WIN_PATTERNS } from '../data';
import { store } from '../store';
import { AppLayout } from './AppLayout';

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

	const onClickCell = (index) => {
		const { currentPlayer, field, isGameEnded } = store.getState();
		if (field[index] || isGameEnded) return;

		const newField = [...field];
		newField[index] = currentPlayer;
		store.dispatch({ type: 'SET_FIELD', payload: newField });

		if (checkWin(newField)) {
			store.dispatch({ type: 'SET_GAME_END_STATUS', payload: true });
		} else if (newField.every((cell) => cell)) {
			store.dispatch({ type: 'SET_DRAW_STATUS', payload: true });
		} else {
			const newCurrentPlayer = currentPlayer === 'X' ? 'O' : 'X';
			store.dispatch({ type: 'SET_CURRENT_PLAYER', payload: newCurrentPlayer });
		}
	};

	const checkWin = (field) => {
		const { currentPlayer } = store.getState();
		return WIN_PATTERNS.some(
			(pattern) =>
				field[pattern[0]] === currentPlayer &&
				field[pattern[1]] === currentPlayer &&
				field[pattern[2]] === currentPlayer,
		);
	};

	return <AppLayout onClickCell={onClickCell} restart={restart} />;
};
