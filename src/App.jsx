import { useRequestGet, useRequestAdd, useDebounce } from './hooks';
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
	const [isSorted, setIsSorted] = useState(false);

	const debouncedSearch = useDebounce(searchItem, 500);

	const filteredTodos = todos.filter((todo) =>
		todo.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
	);

	const sortedTodos = isSorted
		? [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title))
		: filteredTodos;

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
			<Button
				action={isSorted}
				handleClick={() => setIsSorted(!isSorted)}
				clickName={isSorted ? 'Сбросить сортировку' : 'Сортировать по алфавиту'}
			/>
			{isLoading ? (
				<Loader />
			) : (
				<TodoList todos={sortedTodos} setTodos={setTodos} />
			)}
		</div>
	);
};
