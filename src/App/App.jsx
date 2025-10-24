import { useState } from 'react';
import styles from './app.module.css';
import { emptyField, WIN_PATTERNS } from '../data';

export const App = () => {
	const [currentPlayer, setcurrentPlayer] = useState('X');
	const [isGameEnded, setIsGameEnded] = useState(false);
	const [isDraw, setIsDraw] = useState(false);
	const [field, setField] = useState(emptyField);

	return <div></div>;
};
