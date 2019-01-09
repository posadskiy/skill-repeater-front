import React, {Component} from 'react';
import EmptyPage from "./EmptyPage";
import LoginForm from "./LoginForm";
import { connect } from 'react-redux'
import UserAction from '../action/user';

class UserPage extends Component {
	render() {
		const {
			isAuth,
			auth,
		} = this.props;

		return isAuth ? <EmptyPage/> : <LoginForm auth={auth}/>
	}
}

const mapStateToProps = (state) => ({
	isAuth: state.user.isAuth,
});

const mapDispatchToProps = (dispatch) => ({
	auth: (login, password) => UserAction.auth(login, password)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);