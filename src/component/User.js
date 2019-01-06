import React, { Component } from 'react';

import { Header, Icon, List } from 'semantic-ui-react';
import randomIconColor from '../common/IconColor';

class User extends Component {
	render() {
		const {
			name = 'Guest',
			skills = [],
			icon = 'user secret',
		} = this.props.user;


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
									<Icon name={isNeedsRepeat ? 'exclamation' : 'check'} />
								</List.Content>
								<Icon size='big' color={randomIconColor()} name='circle outline'/>
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
