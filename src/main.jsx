import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';
import { CommentsSection } from './CommentsSection/CommentsSection';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
		<hr />
		<CommentsSection />
	</StrictMode>,
);
