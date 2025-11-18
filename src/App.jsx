import {
	useRequestGet,
	useRequestAdd,
	// useRequestUpdate,
} from './hooks';
import styles from './App.module.css';
import { Loader } from './components/Loader/Loader';
import { TodoList } from './components/TodoList/TodoList';
import { Button } from './components/Button/Button';
import { ACTIONS } from './constants';
import { useState } from 'react';
import { Search } from './components/Search/Search';

export const App = () => {
	const { todos, setTodos, isLoading } = useRequestGet();
	const { requestAdd, isCreating } = useRequestAdd(setTodos);
	const [newTodo, setNewTodo] = useState('');
	const [searchItem, setSearchItem] = useState('');
	// const [isSorted, setIsSorted] = useState(false);

	const filteredTodos = todos.filter((todo) =>
		todo.title.toLowerCase().includes(searchItem.toLowerCase()),
	);

	const handleAddTodo = (e) => {
		e.preventDefault();
		if (newTodo.trim()) {
			requestAdd(newTodo);
			setNewTodo('');
		}
	};

	return (
		<div className={styles.app}>
			<h1>TODO LIST</h1>
			<Search
				type="text"
				placeholder="Поиск..."
				value={searchItem}
				onChange={(e) => setSearchItem(e.target.value)}
			/>
			<form onSubmit={handleAddTodo}>
				<input
					type="text"
					placeholder="Новая задача..."
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
				/>
				<Button type="submit" action={isCreating} clickName={ACTIONS.add} />
			</form>
			{isLoading ? <Loader /> : <TodoList todos={filteredTodos} setTodos={setTodos} />}
		</div>
	);
};
