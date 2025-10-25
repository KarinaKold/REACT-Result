import { Field } from '../Field/Field';
import { Information } from '../Information/Information';
import styles from './app.module.css';

export const AppLayout = ({
	field,
	isDraw,
	isGameEnded,
	currentPlayer,
	checkWin,
	onClickCell,
	restart,
}) => {
	return (
		<div className={styles.app}>
			<Information
				isDraw={isDraw}
				isGameEnded={isGameEnded}
				currentPlayer={currentPlayer}
			/>
			<Field field={field} checkWin={checkWin} onClickCell={onClickCell} />
			<button onClick={restart}>Начать заново</button>
		</div>
	);
};
