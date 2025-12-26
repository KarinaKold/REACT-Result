import { Component } from 'react';
import { connect } from 'react-redux';
import { FieldLayout } from './FieldLayout';
import { checkWin } from '../../utils/check-win';
import { selectField, selectCurrentPlayer, selectGameEnd } from '../../selectors';
import {
	setCurrentPlayer,
	setDrawStatus,
	setField,
	setGameEndStatus,
} from '../../actions';

export class FieldContainer extends Component {
	constructor(props) {
		super(props);
		this.onClickCell = this.onClickCell.bind(this);
	}

	onClickCell(index) {
		const { field, currentPlayer, isGameEnded } = this.props;

		if (field[index] || isGameEnded) return;

		const newField = [...field];
		newField[index] = currentPlayer;
		this.props.setField(newField);

		if (checkWin(newField, currentPlayer)) {
			this.props.setGameEndStatus(true);
		} else if (newField.every((cell) => cell)) {
			this.props.setDrawStatus(true);
		} else {
			const newCurrentPlayer = currentPlayer === 'X' ? 'O' : 'X';
			this.props.setCurrentPlayer(newCurrentPlayer);
		}
	}

	render() {
		const { field } = this.props;

		return <FieldLayout field={field} onClickCell={this.onClickCell} />;
	}
}

const mapStateToProps = (state) => ({
	field: selectField(state),
	currentPlayer: selectCurrentPlayer(state),
	isGameEnded: selectGameEnd(state),
});

const mapDispatchToProps = (dispatch) => ({
	setField: (newField) => dispatch(setField(newField)),
	setGameEndStatus: (status) => dispatch(setGameEndStatus(status)),
	setDrawStatus: (status) => dispatch(setDrawStatus(status)),
	setCurrentPlayer: (newCurrentPlayer) => dispatch(setCurrentPlayer(newCurrentPlayer)),
});

export const Field = connect(mapStateToProps, mapDispatchToProps)(FieldContainer);

/*
export class FieldContainer extends Component {
	constructor(props) {
		super(props);
		this.onClickCell = this.onClickCell.bind(this);
	}

	onClickCell(index) {
		const { field, currentPlayer, isGameEnded, dispatch } = this.props;

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
	}

	render() {
		const { field } = this.props;

		return <FieldLayout field={field} onClickCell={this.onClickCell} />;
	}
}

const mapStateToProps = (state) => ({
	field: selectField(state),
	currentPlayer: selectCurrentPlayer(state),
	isGameEnded: selectGameEnd(state),
});

export const Field = connect(mapStateToProps)(FieldContainer);
*/
