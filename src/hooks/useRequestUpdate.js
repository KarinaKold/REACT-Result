import { useState } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';

export const useRequestUpdate = () => {
	const [isUpdating, setIsUpdating] = useState(false);

	const requestUpdate = (id, title, completed) => {
		setIsUpdating(true);

		const dbRef = ref(db, `tasks/${id}`);

		set(dbRef, {
			title,
			completed,
		}).finally(() => setIsUpdating(false));
	};

	return { requestUpdate, isUpdating, setIsUpdating };
};
