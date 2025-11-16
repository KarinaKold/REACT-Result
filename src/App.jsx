import {
	useRequestGet,
	useRequestAdd,
	useRequestUpdate,
	useRequestDelete,
} from './hooks';
import styles from './App.module.css';

export const App = () => {
	const { todos, setTodos, isLoading } = useRequestGet();
	const { requestAdd, isCreating } = useRequestAdd(setTodos);
	const { requestUpdate, isUpdating } = useRequestUpdate(setTodos);
	const { requestDelete, isDeleting } = useRequestDelete(setTodos);

	return (
		<div className={styles.app}>
			<h1>TODO LIST</h1>
			<button disabled={isCreating} onClick={requestAdd}>
				Добавить
			</button>
			<button disabled={isUpdating} onClick={requestUpdate}>
				Обновить
			</button>
			<button disabled={isDeleting} onClick={requestDelete}>
				Удалить
			</button>
			{isLoading ? (
				<div className="loader"></div>
			) : (
				todos.map(({ id, title, completed }) => (
					<div key={id} className={styles.todoItem}>
						<div className={completed ? styles.completed : ''}>{title}</div>
					</div>
				))
			)}
		</div>
	);
};
