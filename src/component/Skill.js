import React, {Component} from 'react';

import { Header, Icon, List, Button, Label } from 'semantic-ui-react';


class Skill extends Component {
	render() {
		const {
			skill: {
				id,
				name,
				isNeedRepeat,
				lastRepeat,
				level,
			} = {},
			repeatSkill,
		} = this.props;

		const showDate = new Date(lastRepeat);
		return (
			<List.Item key={id}>
				<List.Content floated='right'>
					<Button onClick={() => repeatSkill(id)} basic animated='vertical'>
						<Button.Content hidden>Repeat</Button.Content>
						<Button.Content visible>
							<Icon name='play' />
						</Button.Content>
					</Button>
				</List.Content>
				<List.Content>
					<Header as='h4'>
						<Label circular size='huge' color={isNeedRepeat ? 'yellow' : 'green'}>{level}</Label>
						<Header.Content>{name}
							<Header.Subheader>Last repeat {showDate.toLocaleDateString()}</Header.Subheader>
						</Header.Content>
					</Header>
				</List.Content>
			</List.Item>
		)
	}
}

export default Skill;