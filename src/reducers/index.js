import { combineReducers } from 'redux';

const GET_DATA = 'GET_DATA';
const UPDATE_CURRENT_TRACK = 'UPDATE_CURRENT_TRACK';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const ISLOGGED = 'ISLOGGED';
const GET_ALBUM = 'GET_ALBUM';

const dataReducer = (state={},action) => {
    if(action.type === LOGOUT) {
        return false;
    }
    if(action.type === UPDATE_CURRENT_TRACK) {
        return Object.assign({}, state,action.payload);
    }
    if(action.type === GET_DATA) {
        return action.payload;
    }
    if(action.type === GET_ALBUM) {
        return Object.assign({}, state,action.payload)
    }
    return state;
}

const loginReducer = (state=null,action) => {
    if(action.type === ISLOGGED) {
        return action.payload;
    }
    if(action.type === LOGIN) {
        return action.payload;
    }
    if(action.type === LOGOUT) {
        return action.payload;
    }
    return state;
}

export default combineReducers({
    data : dataReducer,
    logged : loginReducer
});
