import { NavLink } from 'react-router';

export const NotFound = () => {
	return (
		<>
			<div>404</div>
			<div>Page is not found</div>
			<NavLink to="/">Go back home</NavLink>
		</>
	);
};
