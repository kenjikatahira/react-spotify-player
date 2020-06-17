import { setSession,getSession, removeSession,isAuthenticated } from '../utils';
import { user,current_track,devices,playlists,recently, get,getPlaylist } from '../api';

/**
 * Retrieves user information
 *
 * @function getUser
 * @return {Void}
 */
export const getUser = () => {
    return dispatch => {
        user().then( data => {
            dispatch({
                type : 'GET_USER',
                payload : data.data
            });
        })
    }
}

/**
 * Updates current track status
 *
 * @function getStatus
 * @param {Object} Track state
 * @return {Void}
 */
export const getStatus = ({current_track,position,duration}) => {
    return async dispatch => {
        console.log('GET_STATUS')
        dispatch({
            type : 'GET_STATUS',
            payload : {
                current_track,
                position,
                duration
            }
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
        let context;
        let current = await current_track();
        // Se não houver musica tocando
        // faz requests de ultimas escutadas
        if(current.status === 204) {
            const recent = await recently();
            current = recent.data.items[0].track;
            console.log('recentes...',current)
        } else {
            current = current.data;
        }

        const album = await get(current.item ? current.item.album.href : current.album.href);

        if((current.context || {}).type == 'playlist') {
            context = await getPlaylist(current.context);
        } else {
            context = album;
        }

        const data = {
            track : current,
            artist : current.item ? current.item.artists[0] : current.artists[0],
            album : album.data,
            context : {
                json : current,
                type : (current.context || {}).type || current.type,
                uri : (current.context || {}).uri || current.uri,
                items : (context.data || {}).items || ((context.data || {}).tracks || {}).items
            }
        }

        dispatch({
            type : 'GET_CURRENT_TRACK',
            payload : data
        });
    }
}

export const getContext = (data) => {
    return dispatch => {
        dispatch({
            type : 'GET_CONTEXT',
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
        devices().then( data => {

            dispatch({
                type : 'GET_DEVICES',
                payload : data.data
            });
        })
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
        playlists().then( data => {
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
