import styles from './field.module.css';

export const FieldLayout = ({ field, onClickCell }) => {
	return (
		<div className={styles.field}>
			{field.map((cell, index) => (
				<div key={index} onClick={() => onClickCell(index)}>
					{cell}
				</div>
			))}
		</div>
	);
};
