import PropTypes from 'prop-types';
import { InformationLayout } from './InformationLayout';
import { STATUS } from '../../data';
import { store } from '../../store';

export const Information = () => {
	const { currentPlayer, isDraw, isGameEnded } = store.getState();

	let status;

	if (isDraw) {
		status = STATUS.DRAW;
	} else {
		isGameEnded
			? (status = STATUS.WIN + `: ${currentPlayer}`)
			: (status = STATUS.TURN + `: ${currentPlayer}`);
	}

	return <InformationLayout status={status} />;
};

Information.propTypes = {
	isDraw: PropTypes.bool,
	isGameEnded: PropTypes.bool,
	currentPlayer: PropTypes.string,
};
