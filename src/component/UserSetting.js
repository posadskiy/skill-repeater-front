import React, {Component} from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux'

import UserAction from '../action/user';

class UserSetting extends Component {
	render() {
		const {
			logOut,
		} = this.props;

		return (
			<div>
				User settings
				<Button.Group vertical>
					<Button>Account settings</Button>
					<Button onClick={logOut}>Log out</Button>
				</Button.Group>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	logOut: () => UserAction.logOut()(dispatch)
});

export default connect(null, mapDispatchToProps)(UserSetting);