import { useState } from 'react';
import styles from './AddTodoForm.module.css';
import { useRequestAdd } from '../../hooks';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { ACTIONS } from '../../constants';

export const AddTodoForm = ({ setTodos }) => {
	const { requestAdd, isCreating } = useRequestAdd(setTodos);
	const [newTodo, setNewTodo] = useState('');

	const handleAddTodo = (e) => {
		e.preventDefault();
		if (newTodo.trim()) {
			requestAdd(newTodo);
			setNewTodo('');
		}
	};

	return (
		<form onSubmit={handleAddTodo}>
			<Input
				type="text"
				placeholder="Новая задача..."
				value={newTodo}
				onChange={(e) => setNewTodo(e.target.value)}
			/>
			<Button
				className={styles.add}
				type="submit"
				action={isCreating}
				clickName={ACTIONS.add}
			/>
		</form>
	);
};
