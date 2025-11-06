import { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './validation';

import styles from './App.module.css';

const sendFormData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isDirty, isValid },
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

	const onSubmit = (formData) => {
		sendFormData(formData);
		reset();
	};

	const submitBtnRef = useRef(null);

	const isFormValid = isValid && isDirty;

	useEffect(() => {
		if (isFormValid) {
			submitBtnRef.current.focus();
		}
	}, [isFormValid]);

	return (
		<>
			<h1>Регистрация</h1>
			<div className={styles.app}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor="email">Почта</label>
					<input
						{...register('email')}
						id="email"
						name="email"
						type="email"
						placeholder="Почта"
					/>
					{errors.email?.message && (
						<div className={styles.error}>{errors.email?.message}</div>
					)}
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
						<div className={styles.error}>
							{errors.confirmPassword?.message}
						</div>
					)}
					<button type="submit" ref={submitBtnRef} disabled={!isFormValid}>
						Зарегистрироваться
					</button>
				</form>
			</div>
		</>
	);
};
