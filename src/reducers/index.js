import { combineReducers } from 'redux';

const GET_USER = 'GET_USER';
const GET_CURRENT_TRACK = 'GET_CURRENT_TRACK';
const GET_PLAYLISTS = 'GET_PLAYLISTS';
const GET_CONTEXT = 'GET_CONTEXT';
const SET_DEVICE_ID = 'SET_DEVICE_ID';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const ISLOGGED = 'ISLOGGED';

const userReducer = (state={},action) => {
    if(action.type === GET_USER) {
        return { ...state , ...action.payload };
    }
    if(action.type === LOGOUT) {
        return {};
    }
    return state;
}

const currentTrackReducer = (state={},action) => {
    if(action.type === GET_CURRENT_TRACK) {
        return { ...state , ...action.payload };
    }
    if(action.type === LOGOUT) {
        return {};
    }
    return state;
}

const playlistsReducer = (state={},action) => {
    if(action.type === GET_PLAYLISTS) {
        return { ...state , ...action.payload };
    }
    if(action.type === LOGOUT) {
        return {};
    }
    return state;
}

const contextReducer = (state={},action) => {
    if(action.type === GET_CURRENT_TRACK) {
        return { ...state , ...action.payload.context };
    }
    if(action.type === GET_CONTEXT) {
        return { ...state , ...action.payload };
    }
    if(action.type === LOGOUT) {
        return {};
    }
    return state;
}

const loginReducer = (state={},action) => {
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

const deviceIdReducer = (state={},action) => {
    if(action.type === SET_DEVICE_ID) {
        return action.payload;
    }
    return state;
}

export default combineReducers({
    user : userReducer,
    logged : loginReducer,
    current : currentTrackReducer,
    playlists : playlistsReducer,
    context : contextReducer,
    device_id : deviceIdReducer
});
