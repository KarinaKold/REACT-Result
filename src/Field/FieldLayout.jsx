import PropTypes from 'prop-types';
import styles from './field.module.css';

export const FieldLayout = ({ field, onClickCell }) => {
	return (
		<>
			<div className={styles.field}>
				{field.map((cell, index) => (
					<div
						className={styles.cell}
						key={index}
						onClick={() => onClickCell(index)}
					>
						{cell}
					</div>
				))}
			</div>
		</>
	);
};

FieldLayout.propTypes = {
	field: PropTypes.array,
	onClickCell: PropTypes.func
}
