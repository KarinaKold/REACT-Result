import { useState } from 'react';
import { useData, useDebounce } from './hooks';
import styles from './App.module.css';
import { TodoList, AddTodoForm, Input, Button, Loader, EmptyMessage } from './components';
import { ACTIONS } from './constants';

export const App = () => {
	const [order, setOrder] = useState('id&_order=asc');
	const [searchItem, setSearchItem] = useState('');
	const [isSorted, setIsSorted] = useState(false);
	const debouncedSearch = useDebounce(searchItem, 1000);
	const { data, isLoading, error, deleteData, createData, updateData } = useData(
		order,
		debouncedSearch,
	);

	if (error) {
		return <h1>{error}</h1>;
	}

	const handleSearch = ({ target }) => {
		setSearchItem(target.value);
	};

	const handleOrder = () => {
		setOrder((prev) =>
			prev === 'id&_order=asc' ? 'title&_order=asc' : 'id&_order=asc',
		);
		setIsSorted(!isSorted);
	};

	return (
		<div className={styles.app}>
			<h1>TODO LIST</h1>
			<Input
				type="text"
				placeholder="Поиск..."
				value={searchItem}
				onChange={handleSearch}
			/>
			<AddTodoForm createData={createData} />
			<Button
				handleClick={handleOrder}
				clickName={isSorted ? ACTIONS.unsort : ACTIONS.sort}
			/>
			{isLoading ? (
				<Loader />
			) : data.length === 0 ? (
				<EmptyMessage />
			) : (
				<TodoList data={data} updateData={updateData} deleteData={deleteData} />
			)}
		</div>
	);
};
