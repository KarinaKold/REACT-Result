import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const useRequestAdd = () => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAdd = (title) => {
		setIsCreating(true);

		const dbRef = ref(db, 'tasks');

		push(dbRef, {
			title,
			completed: false,
		}).finally(() => setIsCreating(false));
	};

	return { requestAdd, isCreating };
};
