import { useState } from 'react';

export const useRequestDelete = (setTodos) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDelete = () => {
		setIsDeleting(true);

		fetch('http://localhost:3000/tasks/5', {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then(() => {
				setTodos((prev) => prev.filter((todo) => todo.id !== '5'));
			})
			.finally(() => setIsDeleting(false));
	};
	return { requestDelete, isDeleting };
};
