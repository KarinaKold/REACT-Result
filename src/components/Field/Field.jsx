import PropTypes from 'prop-types';
import { FieldLayout } from './FieldLayout';
import { store } from '../../store';

export const Field = ({ onClickCell }) => {
	const { field } = store.getState();

	return <FieldLayout field={field} onClickCell={onClickCell} />;
};

Field.propTypes = {
	field: PropTypes.array,
	onClickCell: PropTypes.func,
};
