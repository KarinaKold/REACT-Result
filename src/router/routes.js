import { createBrowserRouter } from 'react-router';
import { App } from '../App';
import { TodoPage } from '../components/TodoPage/TodoPage';
import { NotFound } from '../components/NotFound/NotFound';

export const router = createBrowserRouter([
	{
		path: '/',
		Component: App,
	},
	{ path: 'task/:id', Component: TodoPage },
	{
		path: '*',
		Component: NotFound,
	},
]);
