import { useState } from 'react';
import reactLogo from './assets/react.svg';
// import ReactLogo from './assets/react.svg?react';
import viteLogo from '/vite.svg';
import './App.css';
import { createElement, Fragment } from 'react';

export function App() {
	const [count, setCount] = useState(0);
	let year = new Date().getFullYear();

	return createElement(
		Fragment,
		null,
		createElement(
			'div',
			null,
			createElement(
				'a',
				{ href: 'https://vite.dev', target: '_blank' },
				createElement('img', {
					src: viteLogo,
					className: 'logo',
					alt: 'Vite logo',
				}),
			),
			createElement(
				'a',
				{ href: 'https://react.dev', target: '_blank' },
				createElement('img', {
					src: reactLogo,
					className: 'logo react',
					alt: 'React logo',
				}),
			),
		),
		createElement('h1', null, 'Vite + React'),
		createElement(
			'div',
			{ className: 'card' },
			createElement(
				'button',
				{ onClick: () => setCount((count) => count + 1) },
				`count is ${count}`,
			),
			createElement(
				'p',
				null,
				'Edit ',
				createElement('code', null, 'src/App.jsx'),
				' and save to test HMR',
			),
		),
		createElement(
			'p',
			{ className: 'read-the-docs' },
			'Click on the Vite and React logos to learn more',
		),
		createElement(
			'a',
			{
				href: 'https://reactjs.org',
				className: 'App-link',
				target: '_blank',
				rel: 'noopener noreferrer',
			},
			'Learn React',
		),
		createElement('div', null, year),
	);
}
