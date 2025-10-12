import { useState } from 'react';
import styles from './App.module.css';

const NUMS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export const App = () => {
	// const [operand, setOperand] = useState('');
	const toDisplay = () => {};
	const clearDisplay = () => {};
	const calculate = () => {};

	return (
    <div className={styles.calculator}>
        <div className={styles.display}>0</div>
        <div className={styles.buttons}>
            <button className={styles.btn} onClick={clearDisplay}>C</button>
			<div className={styles.nums}>
				{NUMS.map((num) => {
				return <button className={styles.btn} onClick={toDisplay}>{num}</button>
			})}
			</div>
            <button className={styles.btn + ' ' + styles.operator} onClick={toDisplay}>-</button>
            <button className={styles.btn + ' ' + styles.operator} onClick={toDisplay}>+</button>
			<button className={styles.btn + ' ' + styles.equals} onClick={calculate}>=</button>
        </div>
    </div>
	)
}
