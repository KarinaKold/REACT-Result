import styles from './Button.module.css';

export const Button = ({ action, handleClick, clickName }) => {
	return (
		<button className={styles.button} disabled={action} onClick={handleClick}>
			{clickName}
		</button>
	);
};
