import { useState, useRef } from 'react';
import styles from './App.module.css';
import { useStore } from './store';
import { validateEmail, validatePassword } from './validation';

const errorMessages = {
	email: 'Email должен быть в виде user@email.com',
	password: 'Пароль должен содержать не менее 6 и не более 20 символов',
	confirmPassword: 'Пароли не совпадают',
};

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

		switch (target.name) {
			case 'email':
				if (!validateEmail(target.value)) {
					error = errorMessages.email;
				}
				break;
			case 'password':
				if (!validatePassword(target.value)) {
					error = errorMessages.password;
				}
				break;
			case 'confirmPassword':
				if (target.value !== password) {
					error = errorMessages.confirmPassword;
				}
				break;
			default:
				break;
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
					<label htmlFor="email">Почта</label>
					<input
						id="email"
						name="email"
						type="email"
						placeholder="Почта"
						value={email}
						onChange={onChange}
						onBlur={onBlur}
					/>
					{errors.email && <div className={styles.error}>{errors.email}</div>}
					<label htmlFor="password">Пароль</label>
					<input
						id="password"
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
					<label htmlFor="confirmPassword">Повторите пароль</label>
					<input
						id="confirmPassword"
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
