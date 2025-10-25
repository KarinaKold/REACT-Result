import PropTypes from 'prop-types';
import { InformationLayout } from './InformationLayout';

export const Information = ({ isDraw, isGameEnded, currentPlayer }) => {
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

Information.propTypes = {
	isDraw: PropTypes.bool,
	isGameEnded: PropTypes.bool,
	currentPlayer: PropTypes.string
}
