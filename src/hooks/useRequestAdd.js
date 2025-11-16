import { useState } from 'react';

export const useRequestAdd = (setTodos) => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAdd = () => {
		setIsCreating(true);

		fetch('http://localhost:3000/tasks', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: 'Убраться дома',
				completed: false,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((newTodo) => {
				setTodos((prev) => [...prev, newTodo]);
			})
			.finally(() => setIsCreating(false));
	};

	return { requestAdd, isCreating };
};
