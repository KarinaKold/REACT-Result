import { useSelector, useDispatch } from 'react-redux';
import { FieldLayout } from './FieldLayout';
import { checkWin } from '../../utils/check-win';

export const Field = () => {
	const dispatch = useDispatch();
	const field = useSelector((state) => state.field);
	const currentPlayer = useSelector((state) => state.currentPlayer);
	const isGameEnded = useSelector((state) => state.isGameEnded);

	const onClickCell = (index) => {
		if (field[index] || isGameEnded) return;

		const newField = [...field];
		newField[index] = currentPlayer;
		dispatch({ type: 'SET_FIELD', payload: newField });

		if (checkWin(newField, currentPlayer)) {
			dispatch({ type: 'SET_GAME_END_STATUS', payload: true });
		} else if (newField.every((cell) => cell)) {
			dispatch({ type: 'SET_DRAW_STATUS', payload: true });
		} else {
			const newCurrentPlayer = currentPlayer === 'X' ? 'O' : 'X';
			dispatch({ type: 'SET_CURRENT_PLAYER', payload: newCurrentPlayer });
		}
	};

	return <FieldLayout field={field} onClickCell={onClickCell} />;
};
