import React, {Component} from 'react';

import { Form, List } from 'semantic-ui-react'

const options = [
	{ key: 'today', text: 'Today', value: '0' },
	{ key: 'yesterday', text: 'Yesterday', value: '1' },
	{ key: 'week', text: 'On this week', value: '2' },
	{ key: 'twoweek', text: 'Last two week', value: '3' },
	{ key: 'month', text: 'Last month', value: '4' },
];

class NewSkill extends Component {

	onChangeFormName = (event) => {
		this.props.onChangeName(event.target.value, this.props.index);
	};

	onChangeFormCheckbox = (e, {checked}) => {
		this.props.onChangeIsRepeat(checked, this.props.index);
	};

	onChangeTerm = (e, {value}) => {
		this.props.onChangeTerm(value, this.props.index);
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
				<Form.Input
					value={name}
					onChange={this.onChangeFormName}
					fluid
					label='Name'
					placeholder='Java, Python, ...'
				/>
				<Form.Checkbox
					checked={isRepeatInLastMonth}
					onChange={this.onChangeFormCheckbox}
					toggle
					label='Are you repeat it in last month?'
				/>
				{
					isRepeatInLastMonth && (
						<Form.Select
							fluid
							label='How long ago?'
							options={options}
							onChange={this.onChangeTerm}
							placeholder='Today'
						/>
					)
				}
			</List.Item>
		)
	}
}

export default NewSkill;