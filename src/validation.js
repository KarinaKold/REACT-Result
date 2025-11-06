import * as yup from 'yup';

export const errorMessages = {
	email: 'Email должен быть в виде user@email.com',
	password: 'Пароль должен содержать не менее 6 и не более 20 символов',
	confirmPassword: 'Пароли не совпадают',
};

export const schema = yup
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
