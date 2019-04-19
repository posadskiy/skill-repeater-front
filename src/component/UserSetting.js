import React, {Component} from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux'

import Action from '../action';

class UserSetting extends Component {
	render() {
		const {
			logOut,
		} = this.props;

		return (
			<div>
				<Button.Group basic vertical fluid>
					<Button>Account settings</Button>
					<Button onClick={logOut}>Log out</Button>
				</Button.Group>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	logOut: () => Action.User.logOut()(dispatch)
});

export default connect(null, mapDispatchToProps)(UserSetting);