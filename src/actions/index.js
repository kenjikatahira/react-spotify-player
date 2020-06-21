import { setSession,getSession, removeSession,isAuthenticated } from '../utils';
import {
    get_user,
    get_current_track,
    get_devices,get_playlists,
    get_recently_tracks,
    get_a_playlist,
    get_featured_playlist
} from '../api';

import Player from '../api/Player';
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
 * Retrieves user information
 *
 * @function getUser
 * @return {Void}
 */
export const getFeaturedPlaylist = () => {
    return dispatch => {
        get_featured_playlist().then( data => {
            console.log(`teste`,data)
            dispatch({
                type : 'GET_FEATURED_PLAYLIST',
                payload : data.data
            });
        })
    }
}



/**
 * Retrieves the current track information
 *
 * @function getCurrentTrack
 * @return {Void}
 */
export const getCurrentTrack = () => {
    return async dispatch => {
        let response = await get_current_track();
        if(response.status === 204) {
            response = await get_recently_tracks();
            const [lastTrack] = response.data.items;
            response.data = lastTrack.track;
        }

        const track = await Player.init(response.data);
        console.log(`TRACK`,track)

        dispatch({
            type : 'GET_CURRENT_TRACK',
            payload : track
        });
    }
}

/**
 * Retrieves the current track information
 *
 * @function getPlaylist
 * @return {Void}
 */
export const getPlaylist = (id) => {
    return async dispatch => {
        let {data} = await get_a_playlist(id);

        dispatch({
            type : 'GET_PLAYLIST',
            payload : data
        });
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
 * Retrieves devices avaiable
 *
 * @function setDeviceId
 * @return {Void}
 */
export const setDeviceId = (data) => {
    return dispatch => {
        dispatch({
            type : 'SET_DEVICE_ID',
            payload : data
        });
    }
}

/**
 * Retrieves usuer's playlists
 *
 * @function getPlaylists
 * @return {Void}
 */
export const getPlaylists = () => {
    return dispatch => {
        get_playlists().then( data => {
            dispatch({
                type : 'GET_PLAYLISTS',
                payload : data.data
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

/**
 * @function setView
 * @return {Void}
 */
export const setView = (props) => {
    return async dispatch => {
        dispatch({
            type : 'SET_VIEW',
            payload : (props || {}).uri || 'home'
        });
    }
}

/**
 * @function getPlayer
 * @return {Void}
 */
export const getPlayer = ({uri}) => {
    return async dispatch => {
        let player = await Player.setTracks({uri});
        console.log(`player`,player)
        dispatch({
            type : 'GET_PLAYER',
            payload : player
        });
    }
}

/**
 * Removes authorization data
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
