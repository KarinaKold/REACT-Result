import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './information.module.css';

export class InformationLayout extends Component {
	render() {
		const { status } = this.props;

		return <div className={styles.info}>{status}</div>;
	}
}

InformationLayout.propTypes = {
	status: PropTypes.string,
};
