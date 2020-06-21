import { combineReducers } from 'redux';

const GET_USER = 'GET_USER';
const GET_CURRENT_TRACK = 'GET_CURRENT_TRACK';
const GET_PLAYLISTS = 'GET_PLAYLISTS';
const SET_DEVICE_ID = 'SET_DEVICE_ID';
const GET_FEATURED_PLAYLIST = 'GET_FEATURED_PLAYLIST';
const SET_VIEW = 'SET_VIEW';
const GET_PLAYER = 'GET_PLAYER';

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

const featuredPlaylistReducer = (state={},action) => {
    if(action.type === GET_FEATURED_PLAYLIST) {
        return { ...state , ...action.payload };
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

const viewReducer = (state='home',action) => {
    if(action.type === SET_VIEW) {
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

const playerReducer = (state=[],action) => {
    if(action.type === GET_PLAYER) {
        return action.payload;
    }
    return state;
}

export default combineReducers({
    user : userReducer,
    logged : loginReducer,
    playlists : playlistsReducer,
    device_id : deviceIdReducer,
    home : featuredPlaylistReducer,
    view : viewReducer,
    player : playerReducer
});
