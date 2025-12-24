import { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from '../components/Field/Field';
import { Information } from '../components/Information/Information';
import styles from './app.module.css';

export class AppLayout extends Component {
	render() {
		const { restart } = this.props;

		return (
			<div className={styles.app}>
				<Information />
				<Field />
				<button onClick={restart}>Начать заново</button>
			</div>
		);
	}
}

AppLayout.propTypes = {
	restart: PropTypes.func,
};
