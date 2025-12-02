import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.jsx';
import { ErrorBoundary, Loader } from './components/index.js';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ErrorBoundary>
			<Suspense fallback={<Loader />}>
				<App />
			</Suspense>
		</ErrorBoundary>
	</StrictMode>,
);
