import { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from '../components/Field/Field';
import { Information } from '../components/Information/Information';

export class AppLayout extends Component {
	render() {
		const { restart } = this.props;

		return (
			<div className="bg-blue-400 p-5 rounded-lg text-center m-5">
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
