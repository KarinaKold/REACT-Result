import PropTypes from 'prop-types';
import { Field } from '../components/Field/Field';
import { Information } from '../components/Information/Information';
import styles from './app.module.css';

export const AppLayout = ({ restart, onClickCell }) => {
	return (
		<div className={styles.app}>
			<Information />
			<Field onClickCell={onClickCell} />
			<button onClick={restart}>Начать заново</button>
		</div>
	);
};

AppLayout.propTypes = {
	field: PropTypes.array,
	isDraw: PropTypes.bool,
	isGameEnded: PropTypes.bool,
	currentPlayer: PropTypes.string,
	onClickCell: PropTypes.func,
	restart: PropTypes.func,
};
