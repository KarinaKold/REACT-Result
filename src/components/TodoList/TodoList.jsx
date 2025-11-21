import { Button } from '../Button/Button';
import { useRequestUpdate, useRequestDelete } from '../../hooks';
import styles from './TodoList.module.css';
import { ACTIONS } from '../../constants';
import { useState } from 'react';
import { Input } from '../Input/Input';

export const TodoList = ({ todos, setTodos }) => {
	const { requestUpdate, isUpdating, setIsUpdating } = useRequestUpdate(setTodos);
	const { requestDelete, isDeleting } = useRequestDelete(setTodos);

	const [editingTodo, setEditingTodo] = useState(null); // текущее редактируемое дело
	const [title, setTitle] = useState('');

	const handleToggleComplete = (todo) => {
		const updatedTodo = {
			...todo,
			completed: !todo.completed,
		};
		requestUpdate(todo.id, updatedTodo.title, updatedTodo.completed);
	};

	const handleSave = (todo) => {
		if (editingTodo && title.length > 0) {
			const updatedTodo = {
				id: editingTodo,
				title,
				completed: todo.completed,
			};
			requestUpdate(editingTodo.id, title, updatedTodo.completed);
			setEditingTodo(null);
			setTitle(title);
		}
	};

	const handleEditClick = (todo) => {
		setEditingTodo(todo);
		setTitle(todo.title);
		setIsUpdating(true);
	};

	return (
		<div>
			{todos.map((todo) => (
				<div key={todo.id}>
					{editingTodo && editingTodo.id === todo.id ? (
						<>
							<Input
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
							<Button
								action={isUpdating}
								handleClick={() => handleSave(todo)}
								clickName={ACTIONS.save}
							/>
						</>
					) : (
						<>
							<div className={styles.todoItem}>
								<input
									type="checkbox"
									id={`checkbox-${todo.id}`}
									checked={todo.completed}
									onChange={() => handleToggleComplete(todo)}
								/>
								<label
									htmlFor={`checkbox-${todo.id}`}
									className={styles.customCheckbox}
								></label>
								<div className={todo.completed ? styles.completed : ''}>
									{todo.title}
								</div>
							</div>
							<Button
								action={isUpdating}
								handleClick={() => handleEditClick(todo)}
								clickName={ACTIONS.update}
							/>
						</>
					)}
					<Button
						action={isDeleting}
						handleClick={() => requestDelete(todo.id)}
						clickName={ACTIONS.delete}
					/>
				</div>
			))}
		</div>
	);
};
