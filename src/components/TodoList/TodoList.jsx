import styles from './TodoList.module.css';
import { TodoItem } from '../TodoItem/TodoItem';
import { useSelector } from 'react-redux';

export const TodoList = () => {
	const data = useSelector((state) => state.data.data);
	return (
		<div className={styles.todoList}>
			{data.map(({ id, ...todo }) => (
				<TodoItem key={id} id={id} {...todo} />
			))}
		</div>
	);
};
