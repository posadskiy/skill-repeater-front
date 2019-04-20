import React, {Component} from 'react';
import { Button, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux'

import Action from '../action';

class UserSetting extends Component {
	render() {
		const {
			logOut,
			deleteAccount,
		} = this.props;

		return (
			<div>
				<Button.Group basic vertical fluid>
					<Button>Account settings</Button>
					<Button onClick={logOut}>Log out</Button>
				</Button.Group>
				<Divider />
				<Button.Group vertical fluid>
					<Button onClick={deleteAccount} negative>Delete account</Button>
				</Button.Group>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	logOut: () => Action.User.logOut()(dispatch)
});

export default connect(null, mapDispatchToProps)(UserSetting);