import styles from './EmptyMessage.module.css';

export const EmptyMessage = () => {
	return (
		<div className={styles.emptyMessage}>
			<h2>Здесь пока ничего нет</h2>
			<p>Создайте свою первую задачу!</p>
		</div>
	);
};
