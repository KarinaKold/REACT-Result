export const validateEmail = (email) => {
	return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(email);
};

export const validatePassword = (password) => {
	return /^.{6,20}$/.test(password);
};
