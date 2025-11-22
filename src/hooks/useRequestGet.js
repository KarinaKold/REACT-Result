import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

export const useRequestGet = () => {
	const [todos, setTodos] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const dbRef = ref(db, 'tasks');

		return onValue(dbRef, (snapshot) => {
			const loadedData = snapshot.val() || {};

			setTodos(loadedData);
			setIsLoading(false);
		});
	}, []);

	return { todos, isLoading };
};
