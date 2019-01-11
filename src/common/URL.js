const SERVER_URL = 'http://10.9.23.119:8080/';

const USER_MAIN = SERVER_URL + 'user/';

const USER = {
	USER_BY_ID: (id) =>  USER_MAIN + "id/" + id,
	USER_BY_NAME: (name) => `${USER_MAIN}name/${name}`,
	USER_ALL: USER_MAIN + 'all/',
	AUTH: USER_MAIN + 'auth/',
	SAVE: USER_MAIN,
	UPDATE: USER_MAIN,
};

const URL = {
	USER,
};

export default URL;