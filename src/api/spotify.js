import axios from 'axios';

import { getSession } from '../utils';

/**
 * Scope to provide the right acess to information
 * @type scope
 */
export const scope = 'user-read-private user-library-read user-read-playback-state user-read-playback-position user-modify-playback-state user-top-read user-read-recently-played streaming user-read-email user-follow-read'

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
 * @function get_user
 * @return {Promise}
 */
export const get_user = () => {
    return axios.get('https://api.spotify.com/v1/me', {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

/**
 * Request user's saved tracks
 * @function get_saved_tracks
 * @return {Promise}
 */
export const get_saved_tracks = () => {
    return axios.get('https://api.spotify.com/v1/me/tracks?limit=30', {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

/**
 * Request for the featured playlists from a country
 * @function get_featured_playlist
 * @return {Promise}
 */
export const get_featured_playlist = (country='CA') => {
    return axios.get('https://api.spotify.com/v1/browse/featured-playlists?country='+country+'&limit=8', {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

/**
 * Request for the current track data
 * @function get_current_track
 * @return {Promise}
 */
export const get_current_track = () => {
    return axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

/**
 * Request for the top artists list
 * @function top_artists
 * @return {Promise}
 */
export const top_artists = () => {
    return axios.get('https://api.spotify.com/v1/me/top/artists', {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

/**
 * Request for the recently listened music of the user
 * @function get_recently_tracks
 * @return {Promise}
 */
export const get_recently_tracks = () => {
    return axios.get('https://api.spotify.com/v1/me/player/recently-played', {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

/**
 * Retrieves the devices avaiable
 * @function get_devices
 * @return {Promise}
 */
export const get_devices = () => {
    return axios.get('https://api.spotify.com/v1/me/player/devices', {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

/**
 * Request for the user's playlists
 * @function get_playlists
 * @return {Promise}
 */
export const get_playlists = () => {
    return axios.get('https://api.spotify.com/v1/me/playlists?limit=20&offset=0', {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

/**
 * Request for a album
 * @function get_album
 * @return {Promise}
 */
export const get_album = ({uri}) => {
    const id = uri.split(':');
    return axios.get('https://api.spotify.com/v1/albums/' + id[id.length-1], {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

/**
 * Request for a artist's albums
 * @function get_artists_albums
 * @return {Promise}
 */
export const get_artists_albums = ({uri}) => {
    const id = uri.split(':');
    return axios.get(`https://api.spotify.com/v1/artists/${id[id.length-1]}/albums`, {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

/**
 * Request for a playlist
 * @function get_playlist_cover_image
 * @return {Promise}
 */
export const get_playlist_cover_image = ({uri}) => {
    const id = uri.split(':');
    return axios.get(`https://api.spotify.com/v1/playlists/${id[id.length-1]}/images`, {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

/**
 * Request for a playlist
 * @function get_playlist_items
 * @return {Promise}
 */
export const get_playlist_items = ({uri}) => {
    const id = uri.split(':');
    return axios.get(`https://api.spotify.com/v1/playlists/${id[id.length-1]}/tracks`, {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

/**
 * Request for a playlist
 * @function get_a_playlist
 * @return {Promise}
 */
export const get_a_playlist = ({uri}) => {
    const id = uri.split(':');
    return axios.get('https://api.spotify.com/v1/playlists/' + id[id.length-1], {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}


/**
 * Request for a get_artist_top_tracks
 * @function get_artist_top_tracks
 * @return {Promise}
 */
export const get_artist_top_tracks = ({uri}) => {
    const id = uri.split(':');
    return axios.get(`https://api.spotify.com/v1/artists/${id[id.length-1]}/top-tracks?country=BR`, {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

/**
 * Request for a artist
 * @function get_artist
 * @return {Promise}
 */
export const get_artist = ({uri}) => {
    const id = uri.split(':');
    return axios.get('https://api.spotify.com/v1/artists/' + id[id.length-1], {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

/**
 * Request for a artist related artists
 * @function get_related_artists
 * @return {Promise}
 */
export const get_related_artists = ({uri}) => {
    const id = uri.split(':');
    return axios.get('https://api.spotify.com/v1/artists/' + id[id.length-1] + '/related-artists', {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

/**
 * Request for a track
 * @function get_track
 * @return {Promise}
 */
export const get_track = ({uri}) => {
    const id = uri.split(':');
    return axios.get('https://api.spotify.com/v1/tracks/' + id[id.length-1], {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

/**
 * Request for user's following list
 * @function get_following
 * @return {Promise}
 */
export const get_following = () => {
    return axios.get('https://api.spotify.com/v1/me/following?type=artist&limit=20', {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

/**
 * Request for country's new releases
 * @function get_new_releases
 * @return {Promise}
 */
export const get_new_releases = (country='BR') => {
    return axios.get('https://api.spotify.com/v1/browse/new-releases?country='+country+'&limit=10', {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}


