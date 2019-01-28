import React, { Component } from 'react';

import { Header, Icon, List } from 'semantic-ui-react';
import Skill from "./Skill";
import { connect } from 'react-redux';
import UserAction from "../action/user";

class User extends Component {

	repeatSkill = (i) => {
		this.props.repeatSkill(i, this.props.user.id);
	};

	render() {
		const {
			user: {
				name = 'Guest',
				skills = [],
				icon = 'user secret',
			} = {},
		} = this.props;

		const repeatedSkills = skills.filter(skill => !skill.isNeedRepeat);
		const needRepeatSkills = skills.filter(skill => skill.isNeedRepeat);

		return (
			<div>
				<Header as='h2' icon textAlign='center'>
					<Icon name={icon} circular />
					<Header.Content>{name}</Header.Content>
				</Header>
				<Header as='h3' color='teal' textAlign='center'>
					Need to repeat
				</Header>
				<List>
				{
					needRepeatSkills && needRepeatSkills.map((skill, i) => (
							<Skill
								repeatSkill={this.repeatSkill}
								skill={skill}
							/>
					))
				}
				</List>
				<Header as='h3' color='teal' textAlign='center'>
					Repeated
				</Header>
				<List>
					{
						repeatedSkills && repeatedSkills.map((skill, i) => (
							<Skill
								repeatSkill={this.repeatSkill}
								skill={skill}
							/>
						))
					}
				</List>
			</div>
		);
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
	getUserById: (id) => UserAction.getUserById(id)(dispatch),
	save: (user) => UserAction.save(user)(dispatch),
	repeatSkill: (skillId, userId) => UserAction.repeatSkill(skillId, userId)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);