import React, {Component} from 'react';

import { Form, List } from 'semantic-ui-react'

const options = [
	{ key: 'today', text: 'Today', value: 'today' },
	{ key: 'yesterday', text: 'Yesterday', value: 'yesterday' },
	{ key: 'week', text: 'On this week', value: 'week' },
	{ key: 'twoweek', text: 'Last two week', value: 'twoweek' },
	{ key: 'month', text: 'Last month', value: 'month' },
];

class NewSkill extends Component {

	onChangeFormName = (event) => {
		this.props.onChangeName(event, this.props.index);
	};

	onChangeFormCheckbox = (e, {checked}) => {
		this.props.onChangeIsRepeat(e, {checked}, this.props.index);
	};

	render() {
		const {
			skill: {
				name,
				isRepeatInLastMonth,
			},
		} = this.props;

		return (
			<List.Item>
				<Form.Input value={name} onChange={this.onChangeFormName} fluid label='Name' placeholder='Java, Python, ...' />
				<Form.Checkbox checked={isRepeatInLastMonth} onChange={this.onChangeFormCheckbox} toggle label='Are you repeat it in last month?' />
				{
					isRepeatInLastMonth && <Form.Select fluid label='How long ago?' options={options} placeholder='Today' />
				}
			</List.Item>
		)
	}
}

export default NewSkill;