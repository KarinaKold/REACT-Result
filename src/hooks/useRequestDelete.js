import { useState } from 'react';
import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const useRequestDelete = () => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDelete = (id) => {
		setIsDeleting(true);

		const dbRefDel = ref(db, `tasks/${id}`);

		remove(dbRefDel).finally(() => setIsDeleting(false));
	};
	return { requestDelete, isDeleting };
};
