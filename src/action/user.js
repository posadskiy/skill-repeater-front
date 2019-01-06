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

const UserAction = {
	getUsers,
	changeActivePage,
};

export default UserAction;