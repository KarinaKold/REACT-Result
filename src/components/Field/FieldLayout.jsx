import { Component } from 'react';
import PropTypes from 'prop-types';

export class FieldLayout extends Component {
	render() {
		const { field, onClickCell } = this.props;

		return (
			<>
				<div className="grid grid-cols-3 gap-2.5 text-red-600">
					{field.map((cell, index) => (
						<div
							className="w-25 h-25 flex items-center justify-center bg-green-100 border-3 rounded-lg border-solid border-green-800 text-7xl cursor-pointer transition-colors hover:bg-green-50"
							key={index}
							onClick={() => onClickCell(index)}
						>
							{cell}
						</div>
					))}
				</div>
			</>
		);
	}
}

FieldLayout.propTypes = {
	field: PropTypes.array,
	onClickCell: PropTypes.func,
};
