import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useRef } from 'react';
import styles from './App.module.css';
// import { useStore } from './store';
// import { validateEmail, validatePassword } from './validation';

const errorMessages = {
	email: 'Email должен быть в виде user@email.com',
	password: 'Пароль должен содержать не менее 6 и не более 20 символов',
	confirmPassword: 'Пароли не совпадают',
};

const sendFormData = (formData) => {
	console.log(formData);
};

const schema = yup
	.object()
	.shape({
		email: yup.string().email(errorMessages.email).required('Email обязателен'),
		password: yup
			.string()
			.matches(/^.{6,20}$/, errorMessages.password)
			.required('Пароль обязателен'),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref('password')], errorMessages.confirmPassword)
			.required('Повтор пароля обязателен'),
	})
	.required();

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(schema),
		mode: 'onChange',
		reValidateMode: 'onBlur',
	});

	// const { resetState } = useStore();
	const submitBtnRef = useRef(null);

	const isFormValid = !Object.values(errors).some((err) => err);
	// if (isFormValid) submitBtnRef.current.focus();

	return (
		<>
			<h1>Регистрация</h1>
			<div className={styles.app}>
				<form onSubmit={handleSubmit(sendFormData)}>
					<label htmlFor="email">Почта</label>
					<input
						{...register('email')}
						id="email"
						name="email"
						type="email"
						placeholder="Почта"
					/>
					{errors.email?.message && <div className={styles.error}>{errors.email?.message}</div>}
					<label htmlFor="password">Пароль</label>
					<input
						{...register('password')}
						id="password"
						name="password"
						type="password"
						placeholder="Пароль"
					/>
					{errors.password?.message && (
						<div className={styles.error}>{errors.password?.message}</div>
					)}
					<label htmlFor="confirmPassword">Повторите пароль</label>
					<input
						{...register('confirmPassword')}
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						placeholder="Пароль"
					/>
					{errors.confirmPassword?.message && (
						<div className={styles.error}>{errors.confirmPassword?.message}</div>
					)}
					<button type="submit" ref={submitBtnRef} disabled={!isFormValid}>
						Зарегистрироваться
					</button>
				</form>
			</div>
		</>
	);
};
