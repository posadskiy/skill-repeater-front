const User = {
	SAVE_USER: "SAVE_USER",
	UPDATE_USER: "UPDATE_USER",
	DELETE_USER: "DELETE_USER",
	SAVE_SKILL: "SAVE_SKILL",
	EDIT_SKILL: "EDIT_SKILL",
	DELETE_SKILL: "DELETE_SKILL",
	REPEAT_SKILL: "REPEAT_SKILL",

	SIGN_UP: 'SIGN_UP',
	CLEAR: 'CLEAR',

	AUTH: 'AUTH',
	REG: 'REG',

	FORGOT_PASSWORD: 'FORGOT_PASSWORD',
	CHECK_MATCH_PASSWORD: 'CHECK_MATCH_PASSWORD',
	SAVE_PASSWORD: 'SAVE_PASSWORD',
	CHANGE_EMAIL: 'CHANGE_EMAIL',
	CHANGE_NOTIFICATION: 'CHANGE_NOTIFICATION',

	CONFIRM_EMAIL: 'CONFIRM_EMAIL',
	SEND_MESSAGE: 'SEND_MESSAGE',
	GET_TELEGRAM_LINK: 'GET_TELEGRAM_LINK',

	START_LOADING: 'START_LOADING',

	CHOSE_SKILL_ID: 'CHOSE_SKILL_ID',

	CLEAR_ERROR: 'CLEAR_ERROR',
};

const Common = {
	INIT: 'INIT',
	RESET_STATE: 'RESET_STATE',
};

const ActionType = {
	User,
	Common,
};

export default ActionType;