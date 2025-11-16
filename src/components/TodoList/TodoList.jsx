import styles from './TodoList.module.css';

export const TodoList = ({ todos }) => {
	return todos.map(({ id, title, completed }) => (
		<div key={id} className={styles.todoItem}>
			<div className={completed ? styles.completed : ''}>{title}</div>
		</div>
	));
};
