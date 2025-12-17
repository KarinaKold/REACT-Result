import { useDispatch, useSelector } from 'react-redux';
import styles from './AddTodoForm.module.css';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { selectNewTodo } from '../../selectors';
import { setTodo } from '../../actions';
import { ACTIONS } from '../../constants';

export const AddTodoForm = ({ createData }) => {
	const dispatch = useDispatch();
	const newTodo = useSelector(selectNewTodo);

	const handleAddTodo = (event) => {
		event.preventDefault();
		if (newTodo.trim()) {
			createData({
				title: newTodo,
				completed: false,
			});
			dispatch(setTodo(''));
		}
	};

	const onFieldChange = ({ target }) => {
		dispatch(setTodo(target.value));
	};

	return (
		<form className={styles.addForm} onSubmit={handleAddTodo}>
			<Input
				type="text"
				placeholder="Новая задача..."
				value={newTodo}
				onChange={onFieldChange}
			/>
			<Button className={styles.add} type="submit" clickName={ACTIONS.add} />
		</form>
	);
};
