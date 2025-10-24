import { FieldLayout } from '../Field/FieldLayout';
import { InformationLayout } from '../Information/InformationLayout';
import styles from './app.module.css';

export const AppLayout = ({
	field,
	isDraw,
	isGameEnded,
	currentPlayer,
	checkWin,
	onClickCell,
}) => {
	return (
		<div className={styles.app}>
			<InformationLayout
				isDraw={isDraw}
				isGameEnded={isGameEnded}
				currentPlayer={currentPlayer}
			/>
			<FieldLayout field={field} checkWin={checkWin} onClickCell={onClickCell} />
		</div>
	);
};
