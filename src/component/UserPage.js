import React, {Component} from 'react';
import EmptyPage from "./EmptyPage";
import LoginForm from "./LoginForm";
import { connect } from 'react-redux'

class UserPage extends Component {
	render() {
		const {
			isAuth,
		} = this.props;

		return isAuth ? <EmptyPage/> : <LoginForm/>
	}
}

const mapStateToProps = (state) => ({
	isAuth: state.user.isAuth,
});

export default connect(mapStateToProps, null)(UserPage);