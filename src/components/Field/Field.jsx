import { FieldLayout } from './FieldLayout';
import { store } from '../../store';
import { checkWin } from '../../utils/check-win';

export const Field = () => {
	const { field } = store.getState();

	const onClickCell = (index) => {
		const { currentPlayer, field, isGameEnded } = store.getState();
		if (field[index] || isGameEnded) return;

		const newField = [...field];
		newField[index] = currentPlayer;
		store.dispatch({ type: 'SET_FIELD', payload: newField });

		if (checkWin(newField, currentPlayer)) {
			store.dispatch({ type: 'SET_GAME_END_STATUS', payload: true });
		} else if (newField.every((cell) => cell)) {
			store.dispatch({ type: 'SET_DRAW_STATUS', payload: true });
		} else {
			const newCurrentPlayer = currentPlayer === 'X' ? 'O' : 'X';
			store.dispatch({ type: 'SET_CURRENT_PLAYER', payload: newCurrentPlayer });
		}
	};

	return <FieldLayout field={field} onClickCell={onClickCell} />;
};
