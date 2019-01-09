import React, {Component} from 'react';
import EmptyPage from "./EmptyPage";
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
			save,
		} = this.props;
		if (isCreate) return <CreateUser save={save} />;
		return isAuth ? <EmptyPage/> : <LoginForm auth={auth}/>
	}
}

const mapStateToProps = (state) => ({
	isAuth: state.user.isAuth,
	isCreate: state.user.isCreate,
});

const mapDispatchToProps = (dispatch) => ({
	auth: (login, password) => UserAction.auth(login, password)(dispatch),
	save: (user) => UserAction.save(user)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);