import { useEffect, useState } from 'react';

const URL = 'http://localhost:3000/todos';

export const useData = (order, searchValue) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(URL + `?_sort=${order}&q=${searchValue}`);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			setData(data);
			setIsLoading(false);
		} catch (error) {
			setError(error.message);
			setIsLoading(false);
		}
	};

	const deleteData = async (id) => {
		try {
			const response = await fetch(URL + `/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			setData((prev) => prev.filter((todo) => todo.id !== id));
		} catch (error) {
			setError(error.message);
			setIsLoading(false);
		}
	};

	const createData = async (payload) => {
		setIsLoading(true);
		try {
			const response = await fetch(URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const newTodo = await response.json();
			setData(data.concat(newTodo));
			setIsLoading(false);
		} catch (error) {
			setError(error.message);
			setIsLoading(false);
		}
	};

	const updateData = async (id, payload) => {
		setIsLoading(true);
		try {
			const response = await fetch(URL + `/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const updateTodo = await response.json();
			setData(data.map((todo) => (todo.id === id ? updateTodo : todo)));
			setIsLoading(false);
		} catch (error) {
			setError(error.message);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [order, searchValue]);

	return {
		data,
		isLoading,
		error,
		deleteData,
		createData,
		updateData,
	};
};
