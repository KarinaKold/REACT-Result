import { InformationLayout } from './InformationLayout';

export const Information = ({
	isDraw,
	isGameEnded,
	currentPlayer,
}) => {

	let status;

	if (isDraw) {
		status = 'Ничья';
	} else {
		isGameEnded
			? (status = `Победа: ${currentPlayer}`)
			: (status = `Ходит: ${currentPlayer}`);
	}

	return <InformationLayout status={status} />;
};
