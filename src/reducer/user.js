const defaultState = {
	users: [],
	currentUser: {
		name: "Lex",
		skills: ["groovy", "scala"],
	},
};

const user = (state = defaultState, action) => {
	return state;
};

export default user;