import ActionType from '../common/ActionType';
import Page from "../common/Page";

const defaultState = {
	isAuth: false,
	user: {
		skills: [],
	},
	activePage: Page.MAIN,
	isCreate: false,
};

const user = (state = defaultState, action) => {
	switch (action.type) {
		case ActionType.User.USER_ALL_SUCCESS: return {
			...state,
			users: action.users,
		};
		case ActionType.User.USER_ALL_ERROR: return {
			...state,
			error: action.error,
		};
		case ActionType.User.SAVE_USER_SUCCESS: return {
			...state,
			user: action.user,
			activePage: Page.MAIN,
			isCreate: false,
			isAuth: true,
		};
		case ActionType.User.UPDATE_USER_SUCCESS: return {
			...state,
			user: action.user,
		};
		case ActionType.User.CHANGE_ACTIVE_PAGE: return {
			...state,
			activePage: action.page,
		};
		case ActionType.User.CHANGE_USER: return {
			...state,
			user: action.user,
			activePage: Page.MAIN,
		};
		case ActionType.User.USER_BY_NAME_SUCCESS: return {
			...state,
			user: action.user,
			isAuth: true,
		};
		case ActionType.User.SIGN_UP: return {
			...state,
			isCreate: true,
		};
		default: return state;
	}
};

export default user;