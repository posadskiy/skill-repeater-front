import React, { Component } from 'react';

import { Header, Icon, List, Button } from 'semantic-ui-react';

class User extends Component {
	render() {
		const {
			user: {
				name = 'Guest',
				skills = [],
				icon = 'user secret',
			} = {},
		} = this.props;


		console.log("skills", skills)
		return (
			<div>
				<Header as='h2' icon textAlign='center'>
					<Icon name={icon} circular />
					<Header.Content>{name}</Header.Content>
				</Header>
				<List>
				{
					skills.map((skill, i) => {
						const {
							name = 'Java',
							isNeedsRepeat = true,
							lastRepeat = new Date('2018-01-26T13:51:50.417Z'),
							level = 8,
						} = skill;

						const showDate = new Date(lastRepeat);
						return (
							<List.Item key={i}>
								<List.Content floated='right'>
									<Button basic animated='vertical'>
										<Button.Content hidden>Repeat</Button.Content>
										<Button.Content visible>
											<Icon name='play' />
										</Button.Content>
									</Button>
								</List.Content>
								<Icon size='big' color={isNeedsRepeat ? 'yellow' : 'green'} name='circle outline'/>
								<List.Content>
									<List.Header as='a'>{name}</List.Header>
									<List.Description>
										Level: {level}. Last repeat {showDate.toLocaleDateString() + ' ' + showDate.toLocaleTimeString()}
									</List.Description>
								</List.Content>
							</List.Item>
						)
					})
				}
				</List>
			</div>
		);
	}
}

export default User;
