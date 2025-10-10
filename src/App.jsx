import { useState } from 'react';
import './App.css';

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

	function onAddButtonClick() {
		const updatedList = [...list, { id: Date.now(), value }];
		setList(updatedList);
		setValue('');
		setError('');
	}

	return (
		<div className="app">
			<h1 className="page-heading">Ввод значения</h1>
			<p className="no-margin-text">
				Текущее значение <code>value</code>: "
				<output className="current-value">{value}</output>"
			</p>
			{error !== '' ? <div className="error">{error}</div> : ''}
			<div className="buttons-container">
				<button className="button" onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className="button"
					disabled={!isValueValid}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
			</div>
			<div className="list-container">
				<h2 className="list-heading">Список:</h2>
				{list.length == 0 ? (
					<p className="no-margin-text">Нет добавленных элементов</p>
				) : (
					<ul className="list">
						{list.map(({ id, value }) => (
							<li className="list-item" key={id}>
								{[id, value]}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
