import { forwardRef } from 'react';
import styles from './Field.module.css';

export const Field = forwardRef(({ error, label, ...props }, ref) => {
	return (
		<>
			<label htmlFor={props.id}>{label}</label>
			<input ref={ref} {...props} />
			{error && <div className={styles.error}>{error}</div>}
		</>
	);
});
