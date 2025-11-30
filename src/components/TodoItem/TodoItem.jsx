import { NavLink } from 'react-router';
import styles from './TodoItem.module.css';

export const TodoItem = ({ id, title, completed, updateData }) => {
	const onUpdate = async (id, payload) => {
		await updateData(id, payload);
	};

	return (
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
				<NavLink to={`task/${id}`}>
					<div className={completed ? styles.completed : ''}>
						{title.length > 30 ? `${title.substring(0, 30)}...` : title}
					</div>
				</NavLink>
			</div>
		</>
	);
};
