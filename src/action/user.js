import URL from '../common/URL';
import ActionType from '../common/ActionType';
import axios from 'axios';
import hmacSha256 from 'crypto-js/hmac-sha256';

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

const changeActivePage = (page) => ({
	type: ActionType.User.CHANGE_ACTIVE_PAGE,
	page,
});

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
		}))
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
		}))
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
		}))
};

const signUp = () => {
	return {
		type: ActionType.User.SIGN_UP,
	}
};

const UserAction = {
	getUsers,
	getUserById,
	changeActivePage,
	saveSkills,
	save,
	repeatSkill,
	auth,
	registration,
	signUp,
};

export default UserAction;