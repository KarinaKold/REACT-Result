import { useEffect, useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
				console.log(loadedTodos)
			})
			.finally(() => setIsLoading(false));

	}, []);

	return (
		<div className={styles.app}>
			<h1>TODO LIST</h1>
			{isLoading ? (
				<div className="loader"></div>
			) : (
				todos.map(({ id, title, completed }) => (
					<div key={id} className={styles.todoItem}>
						<div className={completed && styles.completed}>{title}</div>
					</div>
				))
			)}
		</div>
	);
};
