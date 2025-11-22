import { Button } from '../Button/Button';
import { useRequestUpdate, useRequestDelete } from '../../hooks';
import styles from './TodoList.module.css';
import { ACTIONS } from '../../constants';
import { useState } from 'react';
import { Input } from '../Input/Input';

export const TodoList = ({ todos }) => {
	const { requestUpdate, isUpdating, setIsUpdating } = useRequestUpdate();
	const { requestDelete, isDeleting } = useRequestDelete();

	const [editingTodo, setEditingTodo] = useState(null); // текущее редактируемое дело
	const [title, setTitle] = useState('');

	const handleToggleComplete = (id, completed) => {
		const updatedTodo = {
			...todos[id],
			completed: !completed,
		};
		requestUpdate(id, updatedTodo.title, updatedTodo.completed);
	};

	const handleSave = (id, title, completed) => {
		if (editingTodo && title.length > 0) {
			const updatedTodo = {
				id: editingTodo,
				title,
				completed: completed,
			};
			requestUpdate(editingTodo.id, title, updatedTodo.completed);
			setEditingTodo(null);
			setTitle(title);
		}
	};

	const handleEditClick = (id, title, completed) => {
		setEditingTodo({ id, title, completed });
		setTitle(title);
		setIsUpdating(true);
	};

	return (
		<div>
			{Object.entries(todos).map(([id, { title, completed }]) => (
				<div key={id}>
					{editingTodo && editingTodo.id === id ? (
						<>
							<Input
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
							<Button
								action={isUpdating}
								handleClick={() => handleSave(id, title, completed)}
								clickName={ACTIONS.save}
							/>
						</>
					) : (
						<>
							<div className={styles.todoItem}>
								<input
									type="checkbox"
									id={`checkbox-${id}`}
									checked={completed}
									onChange={() => handleToggleComplete(id, title, completed)}
								/>
								<label
									htmlFor={`checkbox-${id}`}
									className={styles.customCheckbox}
								></label>
								<div className={completed ? styles.completed : ''}>
									{title}
								</div>
							</div>
							<Button
								action={isUpdating}
								handleClick={() => handleEditClick(id, title, completed)}
								clickName={ACTIONS.update}
							/>
						</>
					)}
					<Button
						action={isDeleting}
						handleClick={() => requestDelete(id)}
						clickName={ACTIONS.delete}
					/>
				</div>
			))}
		</div>
	);
};
