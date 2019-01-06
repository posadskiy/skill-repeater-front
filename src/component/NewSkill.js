import React, {Component} from 'react';

import { Button, Header, Form } from 'semantic-ui-react'

class NewSkill extends Component {
	state = {
		name: '',
	};

	onChangeName = (event) => {
		this.setState({name: event.target.value})
	};

	saveSkill = () => {

	};

	render() {
		return (
			<Form>
				<Header as='h3'>New skill</Header>
				<Form.Field>
					<label>Name</label>
					<input value={this.state.value} onChange={this.onChangeName} placeholder='Java, Python, ...' />
				</Form.Field>
				<Button onClick={this.saveSkill}>Submit</Button>
			</Form>
		)
	}
}

export default NewSkill;