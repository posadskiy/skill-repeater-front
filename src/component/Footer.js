import React, { Component } from 'react';

import {
	Container,
	Menu,
	Icon,
} from 'semantic-ui-react';
import UserAction from "../action/user";
import {connect} from "react-redux";
import Page from "../common/Page";

class Footer extends Component {
	state = {};

	onClickMenuItem = (e, { name } ) => this.props.changeActivePage(name);

	render() {
		const {
			activePage,
		} = this.props;

		return (
			<Container>
				<Menu fixed='bottom' compact icon='labeled' widths={3}>
					<Menu.Item
						name={Page.MAIN}
						active={activePage === Page.MAIN}
						onClick={this.onClickMenuItem}
					>
						<Icon name='home' />
						Home
					</Menu.Item>

					<Menu.Item
						name={Page.ADD}
						active={activePage === Page.ADD}
						onClick={this.onClickMenuItem}
					>
						<Icon name='add' />
						New
					</Menu.Item>

					<Menu.Item
						name={Page.USER}
						active={activePage === Page.USER}
						onClick={this.onClickMenuItem}
					>
						<Icon name='user' />
						Account
					</Menu.Item>
				</Menu>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	activePage: state.user.activePage,
});

const mapDispatchToProps = (dispatch) => ({
	changeActivePage: (page) => dispatch(UserAction.changeActivePage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);