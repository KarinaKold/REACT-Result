import { useState } from 'react';

export const useRequestUpdate = (setTodos) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const requestUpdate = () => {
		setIsUpdating(true);

		fetch('http://localhost:3000/tasks/4', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: 'Убраться дома',
				completed: true,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((updatedTodo) => {
				setTodos((prev) =>
					prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)),
				);
			})
			.finally(() => setIsUpdating(false));
	};

	return { requestUpdate, isUpdating };
};
