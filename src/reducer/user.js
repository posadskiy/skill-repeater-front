import ActionType from '../common/ActionType';
import Page from "../common/Page";

const defaultState = {
	isAuth: false,
	users: [],
	currentUser: {
		name: "Lex",
		skills: ["groovy", "scala"],
	},
	error: undefined,
	activePage: Page.MAIN,
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
		case ActionType.User.CHANGE_ACTIVE_PAGE: return {
			...state,
			activePage: action.page,
		};
		default: return state;
	}
};

export default user;