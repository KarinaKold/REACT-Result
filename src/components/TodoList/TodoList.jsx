import styles from './TodoList.module.css';
import { TodoItem } from '../TodoItem/TodoItem';
import { useSelector } from 'react-redux';
import { selectData } from '../../selectors';
import { useState } from 'react';

export const TodoList = () => {
	const data = useSelector(selectData);
	const [editingId, setEditingId] = useState(null);

	const handleEdit = (id) => {
		setEditingId(id);
	};

	const handleCancelEdit = () => {
		setEditingId(null);
	};

	return (
		<div className={styles.todoList}>
			{data.map(({ id, ...todo }) => (
				<TodoItem
					key={id}
					id={id}
					{...todo}
					isEditing={editingId === id}
					onEdit={handleEdit}
					onCancelEdit={handleCancelEdit}
				/>
			))}
		</div>
	);
};
