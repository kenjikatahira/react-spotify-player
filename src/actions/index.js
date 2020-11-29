import { setSession,getSession, removeSession,isAuthenticated } from '../utils';
import {
    get_user,
    get_current_track,
    get_devices,get_playlists,
    get_recently_tracks,
    get_a_playlist,
    get_featured_playlist,
    top_artists
} from '../api';

import Api from '../api/player';

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
 * Retrieves home data
 *
 * @function getHome
 * @return {Void}
 */
export const getHome = () => {
    return async dispatch => {
        const promises = [get_recently_tracks(),get_featured_playlist(),top_artists()];
        const [ { data : recentlyTracks }, { data : featuredPlaylists }, { data : topArtists } ] = await Promise.all(Object.values(promises));
        /**
         * Model array of recently tracks to albums for the homepage view
         *
         * @function factoryRecentlyTracks
         * @return {Void}
         */
        const factoryRecentlyTracks = (response) => {
            let  ids = [];
            let albums = response.items.map(item => item.track.album);

            albums = albums.filter(item => {
                if(ids.includes(item.id)) return false;
                ids.push(item.id);
                return item;
            });

            return {
                next : response.next,
                limit : response.limit,
                href : response.href,
                message : 'Recently Played',
                items : albums,
                type : 'recently-played'
            }
        }
        /**
         * Model the playlist response for the homepage view
         *
         * @function factoryPlaylists
         * @return {Void}
         */
        const factoryPlaylists = (response) => {
            return {
                message : response.message,
                items : response.playlists.items,
                type : 'playlists'
            }
        }
        /**
         * Model user's top artists response for the homepage view
         *
         * @function factoryTopArtists
         * @return {Void}
         */
        const factoryTopArtists = (response) => {
            return {
                message : 'Top Artists',
                items : response.items,
                type : 'top-artists'
            };
        }

        dispatch({
            type : 'GET_HOME',
            payload : {
                recentlyTracks : factoryRecentlyTracks(recentlyTracks),
                featuredPlaylists : factoryPlaylists(featuredPlaylists),
                top_artists : factoryTopArtists(topArtists)
            }
        });
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
 * Retrieves a playlist
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
 * Sets a deviceId
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
 * Retrieves user's playlists
 *
 * @function getPlay    lists
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
 * Return the instance of the Player
 * @function getView
 * @return {Void}
 */
export const getView = ({uri}) => {
    return async dispatch => {
        const view = await Api.getView({uri});
        dispatch({
            type : 'GET_VIEW',
            payload : view
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

export const getPlayer = ({ currentTrack, setDeviceId }) => {
    return dispatch => {
        const player = Api.init({ currentTrack, setDeviceId });
        dispatch({
            type : 'GET_PLAYER',
            payload : player
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
        console.log('SET_CURRENT_STATE',state);
        dispatch({
            type : 'SET_CURRENT_STATE',
            payload : state
        });
    }
}
