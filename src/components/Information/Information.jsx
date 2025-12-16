import { useSelector } from 'react-redux';
import { InformationLayout } from './InformationLayout';
import { STATUS } from '../../data';

export const Information = () => {
	const currentPlayer = useSelector((state) => state.currentPlayer);
	const isDraw = useSelector((state) => state.isDraw);
	const isGameEnded = useSelector((state) => state.isGameEnded);

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
