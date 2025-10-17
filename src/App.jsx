import { useState } from 'react';
import styles from './App.module.css';
import { NUMS, OPERATORS } from './data';

const orderOfNUMS = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const sortedNums = orderOfNUMS.map((ind) => NUMS[ind]);

export const App = () => {
	const [operand1, setOperand1] = useState('');
	const [operand2, setOperand2] = useState('');
	const [operator, setOperator] = useState('');
	const [result, setResult] = useState('0');

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
			setIsResult(false);
			if (result == '0' || operand1 == '0') {
				setOperand1(num);
			} else {
				setOperand1(result + num);
			}
		} else {
			if (operator) {
				if (operand2 !== '0') {
					setOperand2(operand2 + num);
				} else {setOperand2(num)}

			} else {
				if (operand1 !== '0') {
					setOperand1(operand1 + num);
				} else {setOperand1(num)}
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
		setResult('0');
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
			setOperand1(res);
			setOperand2('');
			setOperator('');
			setIsResult(true);
		}
	};

	return (
		<div className={styles.calculator}>
			{!isResult ?
			<div className={styles.display}>
				{`${operand1} ${operator} ${operand2}`}
			</div> :
			<div className={styles.display + ' ' + styles.result}>{result}</div>
			}
			<div className={styles.buttons}>
				<div className={styles.buttonsOperator}>
					{OPERATORS.map((operator) => (
						<button
							className={styles.btn + ' ' + styles.operator}
							key={operator}
							onClick={() => toDisplay(operator)}
						>
							{operator}
						</button>
					))}
				</div>
				<div className={styles.buttonsNUMS}>
					{sortedNums.map((num) => {
						return (
							<button
								className={styles.btn}
								onClick={() => toDisplay(num)}
								key={num}
							>
								{num}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
};
