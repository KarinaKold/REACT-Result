import {
	useRequestGet,
	useRequestAdd,
	useRequestUpdate,
	useRequestDelete,
} from './hooks';
import styles from './App.module.css';
import { Loader } from './components/Loader/Loader';
import { TodoList } from './components/TodoList/TodoList';
import { Button } from './components/Button/Button';

const ACTIONS = {
	add: 'Добавить',
	update: 'Обновить',
	delete: 'Удалить',
};

export const App = () => {
	const { todos, setTodos, isLoading } = useRequestGet();
	const { requestAdd, isCreating } = useRequestAdd(setTodos);
	const { requestUpdate, isUpdating } = useRequestUpdate(setTodos);
	const { requestDelete, isDeleting } = useRequestDelete(setTodos);

	return (
		<div className={styles.app}>
			<h1>TODO LIST</h1>
			<Button
				action={isCreating}
				handleClick={requestAdd}
				clickName={ACTIONS.add}
			/>
			<Button
				action={isUpdating}
				handleClick={requestUpdate}
				clickName={ACTIONS.update}
			/>
			<Button
				action={isDeleting}
				handleClick={requestDelete}
				clickName={ACTIONS.delete}
			/>
			{isLoading ? <Loader /> : <TodoList todos={todos} />}
		</div>
	);
};
