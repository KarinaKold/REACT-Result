import { useRef, useState } from 'react';
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
	};
};

const sendFormData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const { getState, updateState } = useStore();

	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [confirmPasswordError, setConfirmPasswordError] = useState('');

	const submitBtnRef = useRef(null);

	const onSubmit = (event) => {
		event.preventDefault();
		sendFormData(getState());
		submitBtnRef.current.focus();
	};
	const { email, password, confirmPassword } = getState();

	const onChange = ({target}) => updateState(target.name, target.value)

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
					/>
					{emailError && <div className={styles.errorLabel}>{emailError}</div>}
					<label>Пароль</label>
					<input
						name="password"
						type="password"
						placeholder="Пароль"
						value={password}
						onChange={onChange}
					/>
					{passwordError && (
						<div className={styles.errorLabel}>{passwordError}</div>
					)}
					<label htmlFor="">Повторить пароль</label>
					<input
						name="confirmPassword"
						type="password"
						placeholder="Пароль"
						value={confirmPassword}
						onChange={onChange}
					/>
					{confirmPasswordError && (
						<div className={styles.errorLabel}>{confirmPasswordError}</div>
					)}
					<button type="submit" ref={submitBtnRef} disabled={!!emailError}>
						Зарегистрироваться
					</button>
				</form>
			</div>
		</>
	);
};
