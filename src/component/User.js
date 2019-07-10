import React, { Component } from 'react';

import { Header, Icon, List } from 'semantic-ui-react';
import Skill from "./Skill";
import { connect } from 'react-redux';
import Action from "../action";

class User extends Component {

	repeatSkill = (i) => {
		this.props.repeatSkill(this.props.user.id, i);
	};

	deleteSkill = (i) => {
		this.props.deleteSkill(this.props.user.id, i);
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
								deleteSkill={this.deleteSkill}
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
								deleteSkill={this.deleteSkill}
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
	isAuth: state.user.isAuth,
});

const mapDispatchToProps = (dispatch) => ({
	deleteSkill: (userId, skillId) => Action.User.deleteSkill(userId, skillId)(dispatch),
	repeatSkill: (userId, skillId) => Action.User.repeatSkill(userId, skillId)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);