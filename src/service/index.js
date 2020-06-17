import { getSession } from '../utils';
import axios from 'axios';

export const user = () => {
    return axios.get('https://api.spotify.com/v1/me', {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

export const current_track = () => {
    return axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

export const topArtist = () => {
    return axios.get('https://api.spotify.com/v1/me/top/artists', {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

export const recently = () => {
    return axios.get('https://api.spotify.com/v1/me/player/recently-played', {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

export const devices = () => {
    return axios.get('https://api.spotify.com/v1/me/player/devices', {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

export const playlists = () => {
    return axios.get('https://api.spotify.com/v1/me/playlists?limit=20&offset=0', {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

export const album = () => {
    return axios.get('https://api.spotify.com/v1/albums/', {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}

export const get = (url) => {
    return axios.get(url, {
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `Bearer ${getSession().access_token}`
        }
    });
}
