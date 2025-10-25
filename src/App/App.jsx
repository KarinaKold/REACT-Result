import { useState } from 'react';
import { emptyField, WIN_PATTERNS } from '../data';
import { AppLayout } from './AppLayout';

export const App = () => {
	const [currentPlayer, setCurrentPlayer] = useState('X');
	const [isGameEnded, setIsGameEnded] = useState(false);
	const [isDraw, setIsDraw] = useState(false);
	const [field, setField] = useState(emptyField);

	const restart = () => {
		setCurrentPlayer('X');
		setIsGameEnded(false);
		setIsDraw(false);
		setField(emptyField);
	};

	const onClickCell = (index) => {
		if (field[index] || isGameEnded) return;

		const newField = [...field];
		newField[index] = currentPlayer;
		setField(newField);

		if (checkWin(newField)) {
			setIsGameEnded(true);
		} else if (newField.every((cell) => cell)) {
			setIsDraw(true);
		} else {
			setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
		}
	};

	const checkWin = (field) => {
		return WIN_PATTERNS.some(
			(pattern) =>
				field[pattern[0]] === currentPlayer &&
				field[pattern[1]] === currentPlayer &&
				field[pattern[2]] === currentPlayer,
		);
	};

	return (
		<AppLayout
			currentPlayer={currentPlayer}
			field={field}
			isDraw={isDraw}
			isGameEnded={isGameEnded}
			onClickCell={onClickCell}
			checkWin={checkWin}
			restart={restart}
		/>
	);
};
