import { useState } from 'react';

export const useRequestDelete = (setTodos) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDelete = (id) => {
		setIsDeleting(true);

		fetch(`http://localhost:3000/tasks/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then(() => {
				setTodos((prev) => prev.filter((todo) => todo.id !== id));
			})
			.finally(() => setIsDeleting(false));
	};
	return { requestDelete, isDeleting };
};
