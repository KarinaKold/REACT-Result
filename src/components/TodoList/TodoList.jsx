import styles from './TodoList.module.css';
import { TodoItem } from '../TodoItem/TodoItem';
import { use } from 'react';
import { AppContext } from '../../context';

export const TodoList = () => {
	const { data } = use(AppContext);

	return (
		<div className={styles.todoList}>
			{data.map(({ id, ...todo }) => (
				<TodoItem key={id} id={id} {...todo} />
			))}
		</div>
	);
};
