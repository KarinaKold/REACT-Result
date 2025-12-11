import PropTypes from 'prop-types';
import { Field } from '../components/Field/Field';
import { Information } from '../components/Information/Information';
import styles from './app.module.css';

export const AppLayout = ({ restart }) => {
	return (
		<div className={styles.app}>
			<Information />
			<Field />
			<button onClick={restart}>Начать заново</button>
		</div>
	);
};

AppLayout.propTypes = {
	restart: PropTypes.func,
};
