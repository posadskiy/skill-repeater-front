import React, {Component} from 'react';

import { Button, Checkbox, Form, Icon, Input } from 'semantic-ui-react'

class CreateUser extends Component {
	state = {
		login: '',
		email: '',
		password: '',
	};

	onChangeLogin = (event) => {
		this.setState({login: event.target.value});
	};

	onChangeEmail = (event) => {
		this.setState({email: event.target.value});
	};

	onChangePassword = (event) => {
		this.setState({password: event.target.value});
	};

	onReg = () => {
		const {
			registration,
		} = this.props;

		const {
			login,
			email,
			password,
		} = this.state;

		registration({login, email, password})
	};

	render() {
		return (
			<Form>
				<Form.Field>
					<Input iconPosition='left' placeholder='Name' onChange={this.onChangeLogin} >
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
				<Button onClick={this.onReg} type='submit'>Sign up</Button>
			</Form>
		)
	}
}

export default CreateUser;