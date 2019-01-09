import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserAction from '../action/user';
import User from './User';

class UserList extends Component {

	render() {
		const {
			user,
		} = this.props;

		console.log("user", user);
		return <User user={user}/>
	}
}

const mapStateToProps = (state) => ({
	user: state.user.user,
	users: state.user.users,
	error: state.user.error,
	isAuth: state.user.isAuth,
});

const mapDispatchToProps = (dispatch) => ({
	getAll: () => UserAction.getUsers()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);