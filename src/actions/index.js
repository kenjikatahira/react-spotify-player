import {
    setSession,
    getSession,
    removeSession,
    isAuthenticated
} from '../utils';

import {
    get_user,
    get_devices,
    get_playlists,
    get_recently_tracks,
    get_featured_playlist,
} from '../api';

import {
    getViewRoute,
    getHome as getHomeAction,
    getSavedTracks as getSavedTracksAction
} from './ViewActions';

import Player from '../api/player';


export const getHome = getHomeAction;
export const getSavedTracks = getSavedTracksAction;

/**
 * Retrieves user information
 *
 * @function getUser
 * @return {Void}
 */
export const getUser = () => {
    return dispatch => {
        get_user().then( data => {
            dispatch({
                type : 'GET_USER',
                payload : data.data
            });
        })
    }
}


/**
 * Retrieves featured playlists from a country
 *
 * @function getFeaturedPlaylist
 * @return {Void}
 */
export const getFeaturedPlaylist = () => {
    return dispatch => {
        get_featured_playlist().then( data => {
            dispatch({
                type : 'GET_FEATURED_PLAYLISTS',
                payload : data.data
            });
        })
    }
}

/**
 * Retrieves devices avaiable
 *
 * @function getDevices
 * @return {Void}
 */
export const getDevices = () => {
    return dispatch => {
        get_devices().then(({data}) => {
            dispatch({
                type : 'GET_DEVICES',
                payload : data
            });
        })
    }
}

/**
 * Retrieves user's playlists
 *
 * @function getPlaylists
 * @return {Void}
 */
export const getPlaylists = () => {
    return dispatch => {
        get_playlists().then(({data}) => {
            dispatch({
                type : 'GET_PLAYLISTS',
                payload : data
            });
        })
    }
}

/**
 * Verifies if the user is logged
 * @function isLogged
 * @return {Void}
 */
export const isLogged = () => {
    return dispatch => {
        dispatch({
            type : 'ISLOGGED',
            payload : {
                status : isAuthenticated(),
                access_token : getSession().access_token
            }
        });
    }
}

/**
 * Sets the app's view ( browse,home,playlists,album )
 * @function setView
 * @param props contains the uri of a song or playlist
 * @return {Void}
 */
export const setView = (props) => {
    return async dispatch => {
        // salve o ultimo tpl acessado
        (props || {}).uri && window.localStorage.setItem('last_uri',props.uri);
        dispatch({
            type : 'SET_VIEW',
            payload : (props || {}).uri || 'home'
        });
    }
}

/**
 * Return object for a template
 * @function getView
 * @return {Void}
 */
export const getView = ({uri}) => {
    return async dispatch => {
        const view = await getViewRoute({uri});
        dispatch({
            type : 'GET_VIEW',
            payload : view
        });
    }
}

/**
 * Return a empty array
 * @function clearView
 * @return {Void}
 */
export const clearView = () => {
    return dispatch => {
        dispatch({
            type : 'CLEAR_VIEW',
            payload : []
        });
    }
}

/**
 * Clear the authorization data
 * @function logout
 * @return {Void}
 */
export const logout = () => {
    return dispatch => {
        removeSession();
        dispatch({
            type : 'LOGOUT',
            payload : {
                status : false,
                access_token : false
            }
        });
    }
}

/**
 * Sets token for the logged user
 * @function login
 * @param response authentication
 * @return {Void}
 */
export const login = (response) => {
    return dispatch => {
        setSession(response);
        dispatch({
            type : 'LOGIN',
            payload : {
                status : true,
                access_token : getSession().access_token
            }
        });
    }
}

export const getPlayer = () => {
    return dispatch => {
        const player = Player.init();
        dispatch({
            type : 'GET_PLAYER',
            payload : player
        });
    }
}

export const getRecentlyTracks = () => {
    return async dispatch => {
        const {data} = await get_recently_tracks();

        dispatch({
            type : 'GET_RECENTLY_TRACKS',
            payload : data.items[0].track
        });
    }
}

/**
 * Set current track and context data
 * @function setCurrentState
 * @param response changed state
 * @return {Void}
 */
export const setCurrentState = (state) => {
    return dispatch => {
        const {
            position,
            duration,
            paused,
            shuffle,
            repeat_mode,
            track_window : {
                current_track,
                next_tracks,
                previous_tracks
            }
        } = state;

        dispatch({
            type : 'SET_CURRENT_STATE',
            payload : {
                position,
                duration,
                paused,
                shuffle,
                repeat_mode,
                current_track,
                next_tracks,
                previous_tracks
            }
        });
    }
}
