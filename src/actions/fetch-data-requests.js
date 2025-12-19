const URL = 'http://localhost:3000/todos';

export const fetchData = (order, searchValue) => {
	return async (dispatch) => {
		dispatch({ type: 'FETCH_DATA_REQUEST' });
		try {
			const response = await fetch(URL + `?_sort=${order}&q=${searchValue}`);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data });
		} catch (error) {
			dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.message });
		}
	};
};

export const deleteData = (id) => {
	return async (dispatch) => {
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
			dispatch({ type: 'DELETE_DATA', payload: id });
		} catch (error) {
			dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.message });
		}
	};
};

export const createData = (payload) => {
	return async (dispatch) => {
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
			dispatch({ type: 'CREATE_DATA', payload: newTodo });
		} catch (error) {
			dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.message });
		}
	};
};

export const updateData = (id, payload) => {
	return async (dispatch) => {
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

			dispatch({ type: 'UPDATE_DATA', payload: updateTodo });
		} catch (error) {
			dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.message });
		}
	};
};
