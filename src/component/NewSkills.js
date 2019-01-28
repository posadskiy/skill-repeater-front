import React, {Component} from 'react';

import { Button, Form, Transition, List } from 'semantic-ui-react'
import NewSkill from "./NewSkill";
import UserAction from "../action/user";
import {connect} from "react-redux";
import Page from "../common/Page";

class NewSkills extends Component {
	state = {
		newSkills: [{}],
	};

	onChangeName = (value, i) => {
		const newSkillTemp = [...this.state.newSkills];
		newSkillTemp[i].name = value;
		this.setState({newSkills: newSkillTemp})
	};

	onChangeIsRepeat = (checked, i) => {
		const newSkillTemp = [...this.state.newSkills];
		newSkillTemp[i].isRepeatInLastMonth = checked;
		this.setState({newSkills: newSkillTemp})
	};

	onChangeTerm = (value, i) => {
		const newSkillTemp = [...this.state.newSkills];
		newSkillTemp[i].termRepeat = value;
		this.setState({newSkills: newSkillTemp})
	};

	onAddSkill = () => {
		this.setState(prevState => ({newSkills: [...prevState.newSkills, {}]}))
	};

	onDeleteSkill = () => {
		this.setState(prevState => ({newSkills: prevState.newSkills.slice(0, -1)}))
	};

	saveSkill = () => {
		this.props.saveSkills(this.props.user.id, this.state.newSkills);
		this.props.changeActivePage(Page.MAIN);
	};

	render() {
		const {
			newSkills,
		} = this.state;

		return (
			<Form>
				<Transition.Group as={List} duration={200} divided size='big' verticalAlign='middle'>
					{newSkills.map((skill, i) => (
						<NewSkill
							key={i}
							index={i}
							skill={skill}
							onChangeName={this.onChangeName}
							onChangeIsRepeat={this.onChangeIsRepeat}
							onChangeTerm={this.onChangeTerm}
						/>
					))}
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
	saveSkills: (user, skills) => UserAction.saveSkills(user, skills)(dispatch),
	changeActivePage: (page) => dispatch(UserAction.changeActivePage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewSkills);