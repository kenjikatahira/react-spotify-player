import { setSession,getSession, removeSession,isAuthenticated } from '../utils';
import { user,current_track,devices,playlists,recently, get } from '../api';

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

export const getStatus = ({current_track,position,duration}) => {
    return async dispatch => {
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

export const getCurrentTrack = () => {
    return async dispatch => {
        let current = await current_track();
        if(current.status === 204) {
            const recent = await recently();
            current = recent.data.items[0].track;
            console.log('recentes...',current)
        } else {
            current = current.data;
            console.log('tocando...',current)
        }
        const album = await get(current.item ? current.item.album.href : current.album.href);
        const data = {
            track : current,
            artist : current.item ? current.item.artists[0] : current.artists[0],
            album : album.data
        }

        dispatch({
            type : 'GET_CURRENT_TRACK',
            payload : data
        });
    }
}

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
 * Verifica se o usuario está logado
 * @function isLogged
 *
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
 * Flag para verificar se o usuario está logado
 * @function login
 *
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
 * Responsavel por deslogar usuario
 * @function logout
 *
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
