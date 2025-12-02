import { Component } from 'react';

export class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
		};
	}
	static getDerivedStateFromError(error) {
		console.log(error.message);
		return {
			hasError: true,
		};
	}
	componentDidCatch(error, errorInfo) {
		console.error('error', error.message);
		console.error('errorInfo', errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return 'Что-то пошло не так';
		}
		return this.props.children;
	}
}
