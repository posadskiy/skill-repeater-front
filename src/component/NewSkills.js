import React, {Component} from 'react';

import { Button, Form, Transition, List } from 'semantic-ui-react'
import NewSkill from "./NewSkill";
import UserAction from "../action/user";
import {connect} from "react-redux";

class NewSkills extends Component {
	state = {
		newSkills: [{}],
	};

	onChangeName = (event, i) => {
		const newSkillTemp = [...this.state.newSkills];
		newSkillTemp[i].name = event.target.value;
		this.setState({newSkills: newSkillTemp})
	};

	onChangeIsRepeat = (e, {checked}, i) => {
		const newSkillTemp = [...this.state.newSkills];
		newSkillTemp[i].isRepeatInLastMonth = checked;
		this.setState({newSkills: newSkillTemp})
	};

	onAddSkill = () => {
		this.setState(prevState => ({newSkills: [...prevState.newSkills, {}]}))
	};

	onDeleteSkill = () => {
		this.setState(prevState => ({newSkills: prevState.newSkills.slice(0, -1)}))
	};

	saveSkill = () => {
		this.props.addSkillsToUser(this.props.user, this.state.newSkills);
		this.props.saveSkills(this.props.user, this.state.newSkills);
	};

	render() {
		const {
			newSkills,
		} = this.state;

		return (
			<Form>
				<Transition.Group as={List} duration={200} divided size='big' verticalAlign='middle'>
					{newSkills.map((skill, i) => <NewSkill key={i} index={i} skill={skill} onChangeName={this.onChangeName} onChangeIsRepeat={this.onChangeIsRepeat}/>)}
				</Transition.Group>
				<Button.Group>
					<Button disabled={newSkills.length === 0} icon='minus' onClick={this.onDeleteSkill} />
					<Button icon='plus' onClick={this.onAddSkill} />
					<Button onClick={this.saveSkill}>Add</Button>
				</Button.Group>
			</Form>
		)
	}
}

const mapStateToProps = (state) => ({
	user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
	addSkillsToUser: (user, skills) => dispatch(UserAction.addSkillsToUser(user, skills)),
	saveSkills: (user, skills) => UserAction.saveSkills(user, skills)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewSkills);