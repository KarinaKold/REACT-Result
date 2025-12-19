import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './TodoItem.module.css';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { ACTIONS } from '../../constants';
import { deleteData, updateData } from '../../actions';

export const TodoItem = ({ id, title, completed }) => {
	const dispatch = useDispatch();
	const [isUpdate, setIsUpdate] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	const [updateValue, setUpdateValue] = useState(title);

	const onDelete = (id) => {
		setIsDelete(true);
		dispatch(deleteData(id));
		setIsDelete(false);
	};

	const handleUpdate = () => {
		setIsUpdate((prev) => !prev);
	};

	const onUpdate = (id, payload) => {
		dispatch(updateData(id, payload));
		setIsUpdate(false);
	};

	return (
		<div>
			{isUpdate ? (
				<>
					<Input
						type="text"
						value={updateValue}
						onChange={(e) => setUpdateValue(e.target.value)}
					/>
					<Button
						action={isUpdate}
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
						action={isUpdate}
						handleClick={handleUpdate}
						clickName={ACTIONS.update}
					/>
				</>
			)}
			<Button
				action={isDelete}
				handleClick={onDelete.bind(null, id)}
				disabled={isDelete}
				clickName={ACTIONS.delete}
			/>
		</div>
	);
};
