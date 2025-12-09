import PropTypes from 'prop-types';
import { FieldLayout } from './FieldLayout';

export const Field = ({ field, onClickCell }) => {
	return <FieldLayout field={field} onClickCell={onClickCell} />;
};

Field.propTypes = {
	field: PropTypes.array,
	onClickCell: PropTypes.func,
};
