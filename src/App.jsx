import { useState } from 'react';
import styles from './App.module.css';

const NUMS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const OPERATORS = ['C', '-', '+', '='];

export const App = () => {
	const [operand1, setOperand1] = useState('');
	const [operand2, setOperand2] = useState('');
	const [operator, setOperator] = useState('');
	const [result, setResult] = useState('');

	const toDisplay = (num) => {
		if (operator) {
        setOperand2(operand2 + num);
      } else {
        setOperand1(operand1 + num);
      }

	};

	const clearDisplay = () => {
		setOperand1('');
		setOperand2('');
		setOperator('');
		setResult('');
	};

	const calculate = () => {
		let res;
		switch (operator) {
        case '+':
          res = operand1 + operand2;
          break;
        case '-':
          res = operand1 - operand2;
		  break;
        default:
          return;
		}

		setResult(`${operand1} ${operator} ${operand2} = ${res}`);
		setOperand1('');
		setOperand2('');
		setOperator('');
	};

	const orderOfNUMS = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
	const sortedNums = orderOfNUMS.map(ind => NUMS[ind]);

	return (
    <div className={styles.calculator}>
        <div className={styles.display}>{result}</div>
        <div className={styles.buttons}>
			<div className={styles.buttonsOperator}>
				<button className={styles.btn} onClick={clearDisplay}>C</button>
				<button className={styles.btn + ' ' + styles.operator} onClick={toDisplay}>-</button>
				<button className={styles.btn + ' ' + styles.operator} onClick={toDisplay}>+</button>
				<button className={styles.btn + ' ' + styles.result} onClick={calculate}>=</button>
			</div>
			<div className={styles.buttonsNUMS}>
				{sortedNums.map((num) => {
					return <button className={styles.btn} onClick={toDisplay} key={num}>{num}</button>
				})}
			</div>
        </div>
    </div>
	)
}
