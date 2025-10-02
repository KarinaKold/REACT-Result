import { useState } from 'react';
import reactLogo from './assets/react.svg';
// import ReactLogo from './assets/react.svg?react';
import viteLogo from '/vite.svg';
import './App.css';

// export const App = () => {
//   <div>
//   <h1>Hello World</h1>
// 	 <img src={reactLogo} alt="React Logo" />
//   <ReactLogo />
//   </div>
// };

export const App = () => {
	// декларативный
	const [count, setCount] = useState(0);
	// императивный
	let year = new Date().getFullYear();
	// декларативный
	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				{/* императивный (функция обработки события по клику) */}
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.jsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
			<a
				href="https://reactjs.org"
				className="App-link"
				target="_blank"
				rel="noopener noreferrer"
			>
				Learn React
			</a>
			<div>{year}</div>
		</>
	);
}

// export default App;
