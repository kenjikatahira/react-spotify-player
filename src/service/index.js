import axios from 'axios';

const endpoint = {
    user : 'https://api.spotify.com/v1/me',
    playing : 'https://api.spotify.com/v1/me/player/currently-playing',
    topArtist : 'https://api.spotify.com/v1/me/top/artists',
    recently : 'https://api.spotify.com/v1/me/player/recently-played',
    player_devices : 'https://api.spotify.com/v1/me/player/devices'
}

const requests = Object.values(endpoint);

const getPromises = (requests=[]) => {
    const token_type = localStorage.getItem('token_type');
    const access_token = localStorage.getItem('access_token');

    let promises = [];
    const setPromises = (url) => {
        return axios({
            method : 'get',
            url : url,
            headers : {
                'content-type' : 'application/json',
                'authorization' : `${token_type} ${access_token}`
            }
        })
        .catch(err => console.log(`ERROR -> ${url}`,err));
    }

    promises = requests.map(setPromises);
    return promises;
}

export const spotify = () => {
    return Promise.all(getPromises(requests));
}
