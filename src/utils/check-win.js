import { WIN_PATTERNS } from '../data';

export const checkWin = (field, currentPlayer) => {
	return WIN_PATTERNS.some(
		(pattern) =>
			field[pattern[0]] === currentPlayer &&
			field[pattern[1]] === currentPlayer &&
			field[pattern[2]] === currentPlayer,
	);
};
