import React, {Component} from 'react';
import UserSetting from "./UserSetting";
import LoginForm from "./LoginForm";
import CreateUser from './CreateUser';
import { connect } from 'react-redux';
import UserAction from '../action/user';

class UserPage extends Component {
	render() {
		const {
			isCreate,
			isAuth,
			auth,
			registration,
			signUp,
		} = this.props;
		if (isCreate) return <CreateUser registration={registration} />;
		return isAuth ? <UserSetting /> : <LoginForm auth={auth} signUp={signUp}/>
	}
}

const mapStateToProps = (state) => ({
	isAuth: state.user.isAuth,
	isCreate: state.user.isCreate,
});

const mapDispatchToProps = (dispatch) => ({
	auth: (login, password) => UserAction.auth(login, password)(dispatch),
	registration: (user) => UserAction.registration(user)(dispatch),
	save: (user) => UserAction.save(user)(dispatch),
	signUp: () => dispatch(UserAction.signUp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);