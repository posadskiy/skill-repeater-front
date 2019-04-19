import React, { Component } from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

class LoginForm extends Component {
	state = {
		login: '',
		password: '',
	};

	onChangeLogin = (event) => {
		this.setState({login: event.target.value});
	};

	onChangePassword = (event) => {
		this.setState({password: event.target.value});
	};

	onClickLogin = () => {
		const {
			login,
			password,
		} = this.state;

		this.props.auth(login, password);
	};

	render() {
		return (
			<div className='login-form'>
				<style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
				<Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
					<Grid.Column style={{maxWidth: 450}}>
						<Header as='h2' color='teal' textAlign='center'>
							Sing in to your account
						</Header>
						<Form size='large'>
							<Segment>
								<Form.Input onChange={this.onChangeLogin} fluid icon='user' iconPosition='left' placeholder='E-mail address'/>
								<Form.Input
									onChange={this.onChangePassword}
									fluid
									icon='lock'
									iconPosition='left'
									placeholder='Password'
									type='password'
								/>

								<Button onClick={this.onClickLogin} color='teal' fluid size='large'>
									Login
								</Button>
							</Segment>
						</Form>
						<Message>
							New to us? <Button basic onClick={this.props.setUserCreatePage}>Sign up</Button>
						</Message>
					</Grid.Column>
				</Grid>
			</div>
		)
	}
}

export default LoginForm;