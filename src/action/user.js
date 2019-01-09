import URL from '../common/URL';
import ActionType from '../common/ActionType';
import axios from 'axios';

const getUsers = () => (dispatch, getState) => {
	axios.get(URL.USER.USER_ALL)
		.then(result => dispatch({
			type: ActionType.User.USER_ALL_SUCCESS,
			users: result.data,
		}))
		.catch(e => dispatch({
			type: ActionType.User.USER_ALL_ERROR,
			error: e,
		}))
};

const changeActivePage = (page) => ({
	type: ActionType.User.CHANGE_ACTIVE_PAGE,
	page,
});

const addSkillsToUser = (user, skills) => {
	const userForSave = { ...user, skills: user.skills.concat(skills)};

	return {
		type: ActionType.User.CHANGE_USER,
		user: userForSave,
	}
};

const auth = (login, password) => dispatch => {
	const user = {
		name: login,
		password,
	};

	axios.post(URL.USER.AUTH, user)
		.then(result => dispatch({
			type: ActionType.User.USER_BY_NAME_SUCCESS,
			user: result.data,
		}))
};

const UserAction = {
	getUsers,
	changeActivePage,
	addSkillsToUser,
	auth,
};

export default UserAction;