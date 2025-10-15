import { useState } from 'react';
import styles from './App.module.css';

const NUMS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const OPERATORS = ['C', '-', '+', '='];

export const App = () => {
	const [operand1, setOperand1] = useState('');
	const [operand2, setOperand2] = useState('');
	const [operator, setOperator] = useState('');
	const [result, setResult] = useState('');

	const [isResult, setIsResult] = useState(false);

	const toDisplay = (btn) => {
		if (btn === 'C') {
		clearDisplay();
		} else if (btn === '=') {
		calculate();
		} else if (OPERATORS.includes(btn)) {
		onClickOperator(btn);
		} else {
		onClickNum(btn);
		}
	};

	const onClickNum = (num) => {
		if (isResult) {
			setOperand1(result.toString() + num);
			setIsResult(false);
		} else {
		if (operator) {
        setOperand2(operand2 + num);
      } else {
        setOperand1(operand1 + num);
      }
	}
	};

	const onClickOperator = (oper) => {
		if (isResult) {
			setOperator(oper);
			setIsResult(false);
		} else if (operand1 && !operator) {
		setOperator(oper);
		}
	};

	const clearDisplay = () => {
		setOperand1('');
		setOperand2('');
		setOperator('');
		setResult('');
		setIsResult(false);
	};

	const calculate = () => {
		if (operand1 && operand2) {
		let res;
		switch (operator) {
        case '+':
			res = +operand1 + +operand2;
          break;
        case '-':
          res = +operand1 - +operand2;
		  break;
        default:
          return;
		}

		setResult(res);
		console.log(typeof res);
		setOperand1(res);
		setOperand2('');
		setOperator('');
		setIsResult(true);
	}
	};

	const orderOfNUMS = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
	const sortedNums = orderOfNUMS.map(ind => NUMS[ind]);

	return (
    <div className={styles.calculator}>
        <div className={styles.display}>{!isResult ? (`${operand1} ${operator} ${operand2}`) : result}</div>
        <div className={styles.buttons}>
			<div className={styles.buttonsOperator}>
				{OPERATORS.map((operator) => (
					<button className={styles.btn} key={operator} onClick={() => toDisplay(operator)}>
					{operator}
					</button>
				))}
			</div>
			<div className={styles.buttonsNUMS}>
				{sortedNums.map((num) => {
					return <button className={styles.btn} onClick={() => toDisplay(num)} key={num}>{num}</button>
				})}
			</div>
        </div>
    </div>
	)
}
