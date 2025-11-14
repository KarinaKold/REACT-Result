import { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './validation';

import styles from './App.module.css';
import { Field } from './components/Field/Field';

const FIELD_LABELS = {
	email: 'Почта',
	password: 'Пароль',
	confirmPassword: 'Повторите пароль',
};

const sendFormData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const {
		register,
		handleSubmit,
		trigger,
		reset,
		formState: { errors, touchedFields, isDirty, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(schema),
		mode: 'onTouched',
		reValidateMode: 'onChange',
	});

	const onSubmit = ({ email, password }) => {
		sendFormData({ email, password });
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
					<Field
						label={FIELD_LABELS.email}
						{...register('email')}
						id="email"
						type="email"
						placeholder="Почта"
						error={errors.email?.message}
					/>
					<Field
						label={FIELD_LABELS.password}
						{...register('password', {
							onChange: () => touchedFields.confirmPassword && trigger('confirmPassword'),
						})}
						id="password"
						type="password"
						placeholder="Пароль"
						error={errors.password?.message}
					/>
					<Field
						label={FIELD_LABELS.confirmPassword}
						{...register('confirmPassword')}
						id="confirmPassword"
						type="password"
						placeholder="Пароль"
						error={errors.confirmPassword?.message}
					/>
					<button type="submit" ref={submitBtnRef} disabled={!isFormValid}>
						Зарегистрироваться
					</button>
				</form>
			</div>
		</>
	);
};
