import styles from './TodoList.module.css';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = ({ data, updateData }) => {
	return (
		<div className={styles.todoList}>
			{data.map(({ id, ...todo }) => (
				<TodoItem key={id} id={id} {...todo} updateData={updateData} />
			))}
		</div>
	);
};
