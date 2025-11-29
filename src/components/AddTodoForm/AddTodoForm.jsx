import { useState } from 'react';
import styles from './AddTodoForm.module.css';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { ACTIONS } from '../../constants';

export const AddTodoForm = ({ createData }) => {
	const [newTodo, setNewTodo] = useState('');

	const handleAddTodo = (event) => {
		event.preventDefault();
		if (newTodo.trim()) {
			createData({
				title: newTodo,
				completed: false,
			});
			setNewTodo('');
		}
	};

	return (
		<form className={styles.addForm} onSubmit={handleAddTodo}>
			<Input
				type="text"
				placeholder="Новая задача..."
				value={newTodo}
				onChange={(e) => setNewTodo(e.target.value)}
			/>
			<Button className={styles.add} type="submit" clickName={ACTIONS.add} />
		</form>
	);
};
