import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserAction from '../action/user';
import User from './User';

class UserList extends Component {

	componentDidMount() {
		this.props.getAll();
	}

	render() {
		const {
			users = [],
		} = this.props;

		return (
			<div>
				{ users.map(user => <User key={user.id} user={user}/>) }
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	users: state.user.users,
	error: state.user.error,
});

const mapDispatchToProps = (dispatch) => ({
	getAll: () => UserAction.getUsers()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);