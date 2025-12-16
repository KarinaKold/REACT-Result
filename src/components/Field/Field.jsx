import { useSelector, useDispatch } from 'react-redux';
import { FieldLayout } from './FieldLayout';
import { checkWin } from '../../utils/check-win';
import { selectField, selectCurrentPlayer, selectGameEnd } from '../../selectors';
import { setCurrentPlayer, setDrawStatus, setField, setGameEndStatus } from '../../actions';

export const Field = () => {
	const dispatch = useDispatch();
	const field = useSelector(selectField);
	const currentPlayer = useSelector(selectCurrentPlayer);
	const isGameEnded = useSelector(selectGameEnd);

	const onClickCell = (index) => {
		if (field[index] || isGameEnded) return;

		const newField = [...field];
		newField[index] = currentPlayer;
		dispatch(setField(newField));

		if (checkWin(newField, currentPlayer)) {
			dispatch(setGameEndStatus(true));
		} else if (newField.every((cell) => cell)) {
			dispatch(setDrawStatus(true));
		} else {
			const newCurrentPlayer = currentPlayer === 'X' ? 'O' : 'X';
			dispatch(setCurrentPlayer(newCurrentPlayer));
		}
	};

	return <FieldLayout field={field} onClickCell={onClickCell} />;
};
