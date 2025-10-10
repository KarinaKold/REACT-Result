import { useState } from 'react';
import styles from './app.module.css';
import './index.css'

export function App() {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	function onInputButtonClick() {
		const promptValue = prompt('Введите значение');

		if (promptValue && promptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа');
		} else {
			setValue(promptValue);
			setError('');
		}
	}

	const isValueValid = value && (value.length >= 3);

	const dateNow = new Date().toLocaleString('ru-RU').replace(/,/g, "");

	function onAddButtonClick() {
		const updatedList = [...list, { id: dateNow, value }];
		setList(updatedList);
		setValue('');
		setError('');
	}

	return (
		<div className={styles.app}>
			<h1 className={styles["page-heading"]}>Ввод значения</h1>
			<p className={styles["no-margin-text"]}>
				Текущее значение <code>value</code>: "
				<output className={styles["current-value"]}>{value}</output>"
			</p>
			{error !== '' ? <div className={styles.error}>{error}</div> : ''}
			<div className={styles["buttons-container"]}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					disabled={!isValueValid}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles["list-container"]}>
				<h2 className={styles["list-heading"]}>Список:</h2>
				{list.length == 0 ? (
					<p className={styles["no-margin-text"]}>Нет добавленных элементов</p>
				) : (
					<ul className={styles.list}>
						{list.map(({ id, value }) => (
							<li className={styles["list-item"]} key={id}>
								<span>{value}</span>   <span>{id}</span>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
