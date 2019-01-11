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
	const userForSave = { ...user, skills: user.skills ? user.skills.concat(skills) : skills};

	return {
		type: ActionType.User.CHANGE_USER,
		user: userForSave,
	}
};

const saveSkills = (user, skills) => dispatch => {
	const userForSave = { ...user, skills: user.skills ? user.skills.concat(skills) : skills};

	axios.post(URL.USER.UPDATE, userForSave)
		.then(result => {
			dispatch({
				type: ActionType.User.UPDATE_USER_SUCCESS,
				user: result.data,
			});
		})
};

const save = (user) => dispatch => {
	axios.put(URL.USER.SAVE, user)
		.then(result => dispatch({
			type: ActionType.User.SAVE_USER_SUCCESS,
			user: result.data,
		}))
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

const signUp = () => {
	return {
		type: ActionType.User.SIGN_UP,
	}
};

const UserAction = {
	getUsers,
	changeActivePage,
	addSkillsToUser,
	saveSkills,
	save,
	auth,
	signUp,
};

export default UserAction;