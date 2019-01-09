import React, {Component} from 'react';

import { Button, Checkbox, Form, Icon, Input } from 'semantic-ui-react'

class CreateUser extends Component {
	state = {
		name: '',
		email: '',
		password: '',
	};

	onChangeName = (event) => {
		this.setState({name: event.target.value});
	};

	onChangeEmail = (event) => {
		this.setState({email: event.target.value});
	};

	onChangePassword = (event) => {
		this.setState({password: event.target.value});
	};

	onSave = () => {
		const {
			save,
		} = this.props;

		const {
			name,
			email,
			password,
		} = this.state;

		save({name, email, password})
	};

	render() {
		return (
			<Form>
				<Form.Field>
					<Input iconPosition='left' placeholder='Name' onChange={this.onChangeName} >
						<Icon name='user' />
						<input />
					</Input>
				</Form.Field>
				<Form.Field>
					<Input iconPosition='left' placeholder='Email' onChange={this.onChangeEmail} >
						<Icon name='at' />
						<input />
					</Input>
				</Form.Field>
				<Form.Field>
					<Input iconPosition='left' type='password' placeholder='Password' onChange={this.onChangePassword} >
						<Icon name='spy' />
						<input />
					</Input>
				</Form.Field>
				<Form.Field required>
					<Checkbox label='I agree to get emails' />
				</Form.Field>
				<Form.Field required>
					<Checkbox label='I agree to the Terms and Conditions' />
				</Form.Field>
				<Button onClick={this.onSave} type='submit'>Sign up</Button>
			</Form>
		)
	}
}

export default CreateUser;