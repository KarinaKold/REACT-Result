import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from './hooks';
import styles from './App.module.css';
import { TodoList, AddTodoForm, Input, Button, Loader, EmptyMessage } from './components';
import { selectOrder, selectSearchItem, selectSortStatus } from './selectors';
import { setSearchItem, setOrder, setSortStatus } from './actions';
import { ACTIONS, ORDER } from './constants';
import { fetchData } from './actions/fetch-data-requests';

export const App = () => {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.data.data);
	const loading = useSelector((state) => state.data.loading);
	const error = useSelector((state) => state.data.error);
	const order = useSelector(selectOrder);
	const searchItem = useSelector(selectSearchItem);
	const isSorted = useSelector(selectSortStatus);

	const debouncedSearch = useDebounce(searchItem, 1000);

	useEffect(() => {
		dispatch(fetchData(order, debouncedSearch));
	}, [order, debouncedSearch]);

	if (error) {
		return <h1>{error}</h1>;
	}

	const handleSearch = ({ target }) => {
		dispatch(setSearchItem(target.value));
	};

	const handleOrder = () => {
		const newOrder = order === ORDER.id_asc ? ORDER.title_asc : ORDER.id_asc;
		dispatch(setOrder(newOrder));
		dispatch(setSortStatus(!isSorted));
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
			<AddTodoForm />
			<Button
				handleClick={handleOrder}
				clickName={isSorted ? ACTIONS.unsort : ACTIONS.sort}
			/>
			{loading ? <Loader /> : data.length === 0 ? <EmptyMessage /> : <TodoList />}
		</div>
	);
};
