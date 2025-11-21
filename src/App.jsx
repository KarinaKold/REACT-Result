import { useState } from 'react';
import { useRequestGet, useDebounce } from './hooks';
import styles from './App.module.css';
import { Loader } from './components/Loader/Loader';
import { EmptyMessage } from './components/EmptyMessage/EmptyMessage';
import { TodoList } from './components/TodoList/TodoList';
import { Button } from './components/Button/Button';
import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';
import { Input } from './components/Input/Input';
import { ACTIONS } from './constants';

export const App = () => {
	const { todos, setTodos, isLoading } = useRequestGet();
	const [searchItem, setSearchItem] = useState('');
	const [isSorted, setIsSorted] = useState(false);

	const debouncedSearch = useDebounce(searchItem, 500);

	const filteredTodos = todos.filter((todo) =>
		todo.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
	);

	const sortedTodos = isSorted
		? [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title))
		: filteredTodos;

	return (
		<div className={styles.app}>
			<h1>TODO LIST</h1>
			<Input
				type="text"
				placeholder="Поиск..."
				value={searchItem}
				onChange={(e) => setSearchItem(e.target.value)}
			/>
			<AddTodoForm setTodos={setTodos} />
			<Button
				action={isSorted}
				handleClick={() => setIsSorted(!isSorted)}
				clickName={isSorted ? ACTIONS.unsort : ACTIONS.sort}
			/>
			{isLoading ? (
				<Loader />
			) : sortedTodos.length === 0 ? (
				<EmptyMessage />
			) : (
				<TodoList todos={sortedTodos} setTodos={setTodos} />
			)}
		</div>
	);
};
