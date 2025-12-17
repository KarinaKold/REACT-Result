import { useDispatch, useSelector } from 'react-redux';
import { useData, useDebounce } from './hooks';
import styles from './App.module.css';
import { TodoList, AddTodoForm, Input, Button, Loader, EmptyMessage } from './components';
import { selectOrder, selectSearchItem, selectSortStatus } from './selectors';
import { setSearchItem, setOrder, setSortStatus } from './actions';
import { ACTIONS, ORDER } from './constants';

export const App = () => {
	const dispatch = useDispatch();
	const order = useSelector(selectOrder);
	const searchItem = useSelector(selectSearchItem);
	const isSorted = useSelector(selectSortStatus);

	const debouncedSearch = useDebounce(searchItem, 1000);
	const { data, isLoading, error, deleteData, createData, updateData } = useData(
		order,
		debouncedSearch,
	);

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
