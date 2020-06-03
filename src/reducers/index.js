import { combineReducers } from 'redux';

const GET_USER = 'GET_USER';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const ISLOGGED = 'ISLOGGED';

const userReducer = (state=false,action) => {
    if(action.type === LOGOUT) {
        return false;
    }
    if(action.type === GET_USER) {
        return action.payload;
    }
    return state;
}

const loginReducer = (state={},action) => {
    if(action.type === LOGIN) {
        return action.payload;
    }
    if(action.type === LOGOUT) {
        return action.payload;
    }
    if(action.type === ISLOGGED) {
        return action.payload;
    }
    return state;
}

export default combineReducers({
    user : userReducer,
    logged : loginReducer
});
