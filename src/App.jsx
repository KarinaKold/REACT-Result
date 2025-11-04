import { useState, useRef } from 'react';
import styles from './App.module.css';

const initialDataState = {
	email: '',
	password: '',
	confirmPassword: '',
};
const useStore = () => {
	const [state, setState] = useState(initialDataState);
	return {
		getState: () => state,
		updateState: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue });
		},
		resetState: () => setState(initialDataState),
	};
};

const sendFormData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const { getState, updateState, resetState } = useStore();
	// const [emailError, setEmailError] = useState(null);
	// const [passwordError, setPasswordError] = useState(null);
	// const [confirmPasswordError, setConfirmPasswordError] = useState(null);
	const [errors, setErrors] = useState({});
	const submitBtnRef = useRef(null);

	// 	const validateEmail = (email) => {
	//     return /S+@S+.S+/.test(email);
	//   };

	//   const validatePassword = (password) => {
	//     return /^[w]{6,20}$/.test(password);
	//   };

	const onSubmit = (event) => {
		event.preventDefault();
		sendFormData(getState());
		resetState();
	};

	const { email, password, confirmPassword } = getState();

	const onChange = ({ target }) => {
		updateState(target.name, target.value);

		let error = '';

		if (
			target.name === 'email' &&
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(target.value)
		) {
			error = '';
		}

		if (target.name === 'password' && /^.{6,20}$/.test(target.value)) {
			error = '';
		}

		if (target.name === 'confirmPassword' && target.value === password) {
			error = '';
		}

		setErrors((prev) => ({ ...prev, [target.name]: error }));
	};

	const onBlur = ({ target }) => {

		let error = '';

		if (
			target.name === 'email' &&
			!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(target.value)
		) {
			target.name = 'Email должен быть в виде user@email.com';
		}

		if (target.name === 'password' && !/^.{6,20}$/.test(target.value)) {
			error = 'Пароль должен содержать не менее 6 и не более 20 символов';
		}

		if (target.name === 'confirmPassword' && target.value !== password) {
			error = 'Пароли не совпадают';
		}

		setErrors((prev) => ({ ...prev, [target.name]: error }));
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
					{errors.email && (
						<div className={styles.error}>{errors.email}</div>
					)}
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
					<button type="submit"
					ref={submitBtnRef}
					disabled={!isFormValid}>
						Зарегистрироваться
					</button>
				</form>
			</div>
		</>
	);
};
