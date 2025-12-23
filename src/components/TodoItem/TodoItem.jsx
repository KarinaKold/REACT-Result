import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './TodoItem.module.css';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { ACTIONS } from '../../constants';
import { deleteData, updateData } from '../../actions';

export const TodoItem = ({ id, title, completed, isEditing, onEdit, onCancelEdit }) => {
	const dispatch = useDispatch();
	const [isDelete, setIsDelete] = useState(false);
	const [updateValue, setUpdateValue] = useState(title);

	const onDelete = (id) => {
		setIsDelete(true);
		dispatch(deleteData(id));
		setIsDelete(false);
	};

	const handleUpdate = () => {
		isEditing ? onCancelEdit() : onEdit(id);
	};

	const onUpdate = (id, payload) => {
		if (updateValue === '') {
			onDelete(id);
		} else {
			dispatch(updateData(id, payload));
		}
		onCancelEdit();
	};

	return (
		<div>
			{isEditing ? (
				<>
					<Input
						type="text"
						id={`text-${id}`}
						value={updateValue}
						onChange={(e) => setUpdateValue(e.target.value)}
					/>
					<Button
						action={!isEditing}
						handleClick={onUpdate.bind(null, id, {
							title: updateValue,
						})}
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
							onChange={onUpdate.bind(null, id, {
								completed: !completed,
							})}
						/>
						<label
							htmlFor={`checkbox-${id}`}
							className={styles.customCheckbox}
						></label>
						<div className={completed ? styles.completed : ''}>{title}</div>
					</div>
					<Button
						action={isEditing}
						handleClick={handleUpdate}
						clickName={ACTIONS.update}
					/>
				</>
			)}
			<Button
				action={isDelete}
				handleClick={onDelete.bind(null, id)}
				clickName={ACTIONS.delete}
			/>
		</div>
	);
};
