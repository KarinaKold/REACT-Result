import { useSelector } from 'react-redux';
import { InformationLayout } from './InformationLayout';
import { STATUS } from '../../data';
import { selectCurrentPlayer, selectDraw, selectGameEnd } from '../../selectors';


export const Information = () => {
	const currentPlayer = useSelector(selectCurrentPlayer);
	const isDraw = useSelector(selectDraw);
	const isGameEnded = useSelector(selectGameEnd);

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
