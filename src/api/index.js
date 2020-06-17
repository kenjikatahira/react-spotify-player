import axios from 'axios';
import { getSession } from '../utils';

/**
 * Scope to provide the right acess to information
 * @type scope
 */
export const scope = 'user-read-private user-read-playback-state user-read-playback-position user-modify-playback-state user-top-read user-read-recently-played streaming user-read-email'

/**
 * Basic request with the token provided
 * @function get
 * @param request url
 * @return {Promise}
 */
export const get = (url) => {
    return axios.get(url, {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

/**
 * Request for the user data
 * @function user
 * @return {Promise}
 */
export const user = () => {
    return axios.get('https://api.spotify.com/v1/me', {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

/**
 * Request for the current track data
 * @function current_track
 * @return {Promise}
 */
export const current_track = () => {
    return axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

/**
 * Request for the top artists list
 * @function topArtist
 * @return {Promise}
 */
export const topArtist = () => {
    return axios.get('https://api.spotify.com/v1/me/top/artists', {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

/**
 * Request for the recently listened music of the user
 * @function recently
 * @return {Promise}
 */
export const recently = () => {
    return axios.get('https://api.spotify.com/v1/me/player/recently-played', {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

/**
 * Retrieves the devices avaiable
 * @function devices
 * @return {Promise}
 */
export const devices = () => {
    return axios.get('https://api.spotify.com/v1/me/player/devices', {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

/**
 * Request for the user's playlists
 * @function playlists
 * @return {Promise}
 */
export const playlists = () => {
    return axios.get('https://api.spotify.com/v1/me/playlists?limit=20&offset=0', {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

/**
 * Request for a albuym
 * @function album
 * @return {Promise}
 */
export const album = () => {
    return axios.get('https://api.spotify.com/v1/albums/', {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}
