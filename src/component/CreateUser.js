import React, {Component} from 'react';

import { Button, Checkbox, Form, Icon, Input, Message } from 'semantic-ui-react'

class CreateUser extends Component {
	state = {
		login: '',
		email: '',
		password: '',
		isAgreeTerm: false,
		isAgreeEmails: false,

		errorLogin: false,
		errorEmail: false,
		errorPassword: false,
		errorTermCheckbox: false,
		errorForm: false,
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

		if (!this.checkLogin() || !this.checkEmail() || !this.checkPassword() || !this.checkIsTermAgree()) {
			this.setState({errorForm: true});
			return;
		}

		registration({login, email, password})
	};

	cancel = () => {
		this.props.goToUserLoginPage();
	};

	changeAgreeTerms = (e, value) => {
		this.setState({isAgreeTerm: value.checked});
	};

	changeAgreeEmails = (e, value) => {
		this.setState({isAgreeEmails: value.checked});
	};

	checkLogin = () => this.checkField('login', this.state.login.trim().length >= 3);
	checkEmail = () => this.checkField('email', this.state.email.includes('@'));
	checkPassword = () => this.checkField('password', !!this.state.password);
	checkIsTermAgree = () => this.checkField('termCheckbox', this.state.isAgreeTerm);

	checkField = (field, isCorrect) => {
		const errorField = 'error' + field.charAt(0).toUpperCase() + field.substr(1);
		this.setState({[errorField]: !isCorrect});
		return isCorrect;
	};

	render() {
		const {
			isAgreeTerm = false,
			isAgreeEmails = false,

			errorLogin = false,
			errorEmail = false,
			errorPassword = false,
			errorTermCheckbox = false,
			errorForm = false,
		} = this.state;

		return (
			<Form error={errorForm}>
				<Form.Field>
					<Form.Input error={errorLogin} iconPosition='left' placeholder='Name' onChange={this.onChangeLogin} >
						<Icon name='user' />
						<input />
					</Form.Input>
					{
						errorLogin && (
						<Message
							error
							header='Login is incorrect'
							content='You can use three chars and more.'
						/>
					)}
				</Form.Field>
				<Form.Field>
					<Form.Input error={errorEmail} iconPosition='left' placeholder='Email' onChange={this.onChangeEmail} >
						<Icon name='at' />
						<input />
					</Form.Input>
					{
						errorEmail && (
							<Message
								error
								header='Email is incorrect'
								content='You can use "@" in your e-mail.'
							/>
						)}
				</Form.Field>
				<Form.Field>
					<Form.Input error={errorPassword} iconPosition='left' type='password' placeholder='Password' onChange={this.onChangePassword} >
						<Icon name='spy' />
						<input />
					</Form.Input>
				</Form.Field>
				{
					errorPassword && (
						<Message
							error
							header='Password is incorrect'
							content='You can use non-empty password.'
						/>
					)}
				<Form.Field>
					<Form.Checkbox onClick={this.changeAgreeEmails} checked={isAgreeEmails} label='I agree to get emails' />
				</Form.Field>
				<Form.Field>
					<Form.Checkbox required onClick={this.changeAgreeTerms} checked={isAgreeTerm} label='I agree to the Terms and Conditions' error={errorTermCheckbox} />
				</Form.Field>
				<Button onClick={this.onReg} type='submit'>Sign up</Button>
				<Button onClick={this.cancel}>Cancel</Button>
			</Form>
		)
	}
}

export default CreateUser;