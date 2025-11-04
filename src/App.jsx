import { useState, useRef } from 'react';
import styles from './App.module.css';
import { useStore } from './store';
import { validateEmail, validatePassword } from './validation';

const sendFormData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const { getState, updateState, resetState } = useStore();
	const [errors, setErrors] = useState({});
	const submitBtnRef = useRef(null);

	const onSubmit = (event) => {
		event.preventDefault();
		sendFormData(getState());
		resetState();
	};

	const { email, password, confirmPassword } = getState();

	const onChange = ({ target }) => {
		updateState(target.name, target.value);

		let error = '';

		const validItems = {
			email: validateEmail(target.value),
			password: validatePassword(target.value),
			confirmPassword: target.value === password,
		};

		if (target.name in validItems) error = '';

		setErrors((prev) => ({ ...prev, [target.name]: error }));
	};

	const onBlur = ({ target }) => {
		let error = '';

		if (target.name === 'email' && !validateEmail(target.value)) {
			error = 'Email должен быть в виде user@email.com';
		}

		if (target.name === 'password' && !validatePassword(target.value)) {
			error = 'Пароль должен содержать не менее 6 и не более 20 символов';
		}

		if (target.name === 'confirmPassword' && target.value !== password) {
			error = 'Пароли не совпадают';
		}

		setErrors((prev) => ({ ...prev, [target.name]: error }));

		isFormValid && submitBtnRef.current.focus();
	};

	const isFormValid =
		email && password && confirmPassword && !Object.values(errors).some((err) => err);

	return (
		<>
			<h1>Регистрация</h1>
			<div className={styles.app}>
				<form onSubmit={onSubmit}>
					<label>Почта</label>
					<input
						name="email"
						type="email"
						placeholder="Почта"
						value={email}
						onChange={onChange}
						onBlur={onBlur}
					/>
					{errors.email && <div className={styles.error}>{errors.email}</div>}
					<label>Пароль</label>
					<input
						name="password"
						type="password"
						placeholder="Пароль"
						value={password}
						onChange={onChange}
						onBlur={onBlur}
					/>
					{errors.password && (
						<div className={styles.error}>{errors.password}</div>
					)}
					<label>Повторите пароль</label>
					<input
						name="confirmPassword"
						type="password"
						placeholder="Пароль"
						value={confirmPassword}
						onChange={onChange}
						onBlur={onBlur}
					/>
					{errors.confirmPassword && (
						<div className={styles.error}>{errors.confirmPassword}</div>
					)}
					<button type="submit" ref={submitBtnRef} disabled={!isFormValid}>
						Зарегистрироваться
					</button>
				</form>
			</div>
		</>
	);
};
