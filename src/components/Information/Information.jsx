import { Component } from 'react';
import { connect } from 'react-redux';
import { InformationLayout } from './InformationLayout';
import { STATUS } from '../../data';
import { selectCurrentPlayer, selectDraw, selectGameEnd } from '../../selectors';

export class InformationContainer extends Component {
	render() {
		const { currentPlayer, isDraw, isGameEnded } = this.props;

		let status;

		if (isDraw) {
			status = STATUS.DRAW;
		} else {
			isGameEnded
				? (status = `${STATUS.WIN}: ${currentPlayer}`)
				: (status = `${STATUS.TURN}: ${currentPlayer}`);
		}

		return <InformationLayout status={status} />;
	}
}

const mapStateToProps = (state) => ({
	currentPlayer: selectCurrentPlayer(state),
	isDraw: selectDraw(state),
	isGameEnded: selectGameEnd(state),
});

export const Information = connect(mapStateToProps)(InformationContainer);
