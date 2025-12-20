import styles from './TodoList.module.css';
import { TodoItem } from '../TodoItem/TodoItem';
import { useSelector } from 'react-redux';
import { selectData } from '../../selectors';

export const TodoList = () => {
	const data = useSelector(selectData);

	return (
		<div className={styles.todoList}>
			{data.map(({ id, ...todo }) => (
				<TodoItem key={id} id={id} {...todo} />
			))}
		</div>
	);
};
