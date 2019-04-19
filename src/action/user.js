import URL from '../common/URL';
import ActionType from '../common/ActionType';
import axios from 'axios';
import hmacSha256 from 'crypto-js/hmac-sha256';
import Action from '../action';

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

const getUserById = (id) => (dispatch) => {
	axios.get(URL.USER.USER_BY_ID(id))
		.then(result => dispatch({
			type: ActionType.User.USER_BY_ID_SUCCESS,
			user: result.data,
		}))
		.catch(result => console.log(result))
};

const saveSkills = (userId, skills) => dispatch => {
	axios.post(URL.USER.SAVE_SKILL(userId), skills)
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
		}));
	dispatch(Action.Page.setMainPage());
};

const repeatSkill = (skillId, userId) => (dispatch) => {
	axios.post(URL.USER.REPEAT_SKILL(userId, skillId))
		.then(result => dispatch({
			type: ActionType.User.REPEAT_SKILL_SUCCESS,
			user: result.data,
		}))
};

const auth = (login, password) => dispatch => {
	const user = {
		login,
		password: hmacSha256(password, "$!@#$%$#@").toString(),
	};

	axios.post(URL.USER.AUTH, user)
		.then(result => dispatch({
			type: ActionType.User.USER_BY_NAME_SUCCESS,
			user: result.data,
		}));

	dispatch(Action.Page.setMainPage());
};

const registration = (user) => dispatch => {
	const userForSave = {
		...user,
		password: hmacSha256(user.password, "$!@#$%$#@").toString(),
	};

	axios.post(URL.USER.REG, userForSave)
		.then(result => dispatch({
			type: ActionType.User.REG_SUCCESS,
			user: result.data,
		}));

	dispatch(Action.Page.setMainPage());
};

const logOut = () => (dispatch) => {
	dispatch(clearUser());
	dispatch(Action.Page.setMainPage());
};

const clearUser = () => {
	return {
		type: ActionType.User.CLEAR,
	}
};

const User = {
	getUsers,
	getUserById,
	saveSkills,
	save,
	repeatSkill,
	auth,
	registration,
	logOut,
};

export default User;