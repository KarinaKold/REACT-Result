import { Component } from 'react';
import { connect } from 'react-redux';
import { AppLayout } from './AppLayout';
import { RESTART_GAME } from '../actions';

class AppContainer extends Component {
	restart = () => {
		this.props.restart();
	};

	render() {
		return <AppLayout restart={this.restart} />;
	}
}

const mapDispatchToProps = (dispatch) => ({
	restart: () => dispatch(RESTART_GAME),
});

export const App = connect(null, mapDispatchToProps)(AppContainer);
