import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex
	const [steps, _] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);
	// Клик назад, Клик вперед, Начать сначала
	const next = () => {
		setActiveIndex(activeIndex + 1);
	};

	const back = () => {
		setActiveIndex(activeIndex - 1);
	};

	const restart = () => {
		setActiveIndex(0);
	};

	// 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
	const firstStep = activeIndex == 0;
	const lastStep = activeIndex == steps.length - 1;

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map((step, index) => {
							return (
								<li
									className={
										styles['steps-item'] +
										(index < activeIndex ? ' ' + styles.done : '') +
										(index === activeIndex ? ' ' + styles.active : '')
									}
									key={step.id}
								>
									<button
										className={styles['steps-item-button']}
										onClick={() => setActiveIndex(index)}
									>
										{index + 1}
									</button>
									{step.title}
								</li>
							);
						})}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							disabled={firstStep}
							onClick={back}
						>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={lastStep ? restart : next}
						>
							{lastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
