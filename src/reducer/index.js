import {combineReducers} from 'redux';

import user from './user';
import page from './page';

const rootReducer = combineReducers({
	user,
	page,
});

export default rootReducer;