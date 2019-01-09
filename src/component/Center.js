import React, { Component } from 'react';

import Page from '../common/Page';
import UserList from "./UserList";
import EmptyPage from "./EmptyPage";
import UserPage from "./UserPage";
import {connect} from "react-redux";
import NewSkills from "./NewSkills";

class Center extends Component {

	render() {
		const {
			activePage,
		} = this.props;

		switch(activePage) {
			case Page.MAIN: return <UserList/>;
			case Page.ADD: return <NewSkills/>;
			case Page.USER: return <UserPage/>;
			default: return <EmptyPage/>;
		}

	}
}

const mapStateToProps = (state) => ({
	activePage: state.user.activePage,
});

export default connect(mapStateToProps, null)(Center);