import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useData } from '../../hooks';
import styles from './TodoPage.module.css';
import { ACTIONS } from '../../constants';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

export const TodoPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { data, deleteData, updateData } = useData();
	const { title, completed } = data;
	const [isUpdate, setIsUpdate] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	const [updateValue, setUpdateValue] = useState(title);

	const onDelete = async (id) => {
		setIsDelete(true);
		await deleteData(id);
		setIsDelete(false);
		navigate('/');
	};

	const handleUpdate = () => {
		setIsUpdate((prev) => !prev);
	};

	const onUpdate = async (id, payload) => {
		await updateData(id, payload);
		setIsUpdate(false);
	};

	return (
		<div className={styles.todoPage}>
			<button onClick={() => navigate(-1)}>Назад</button>
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
