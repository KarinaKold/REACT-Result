import { Component } from 'react';
import PropTypes from 'prop-types';

export class InformationLayout extends Component {
	render() {
		const { status } = this.props;

		return (
			<div className="text-2xl text-black bg-amber-400 p-2.5 mb-5 rounded-sm">
				{status}
			</div>
		);
	}
}

InformationLayout.propTypes = {
	status: PropTypes.string,
};
