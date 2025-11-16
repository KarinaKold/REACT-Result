import styles from './Button.module.css';

export const Button = ({ actionState, handleClick, clickName }) => {
	return (
		<button className={styles.button} disabled={actionState} onClick={handleClick}>
			{clickName}
		</button>
	);
};
