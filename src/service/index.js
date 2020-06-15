import axios from 'axios';

const general = {
    user : 'https://api.spotify.com/v1/me',
    playing : 'https://api.spotify.com/v1/me/player/currently-playing',
    topArtist : 'https://api.spotify.com/v1/me/top/artists',
    recently : 'https://api.spotify.com/v1/me/player/recently-played',
    player_devices : 'https://api.spotify.com/v1/me/player/devices'
}

const query = {
    album : {
        method : 'get',
        url : 'https://api.spotify.com/v1/albums/'
    },
    playing : {
        method : 'get',
        url : 'https://api.spotify.com/v1/me/player/currently-playing'
    }
}


const getPromises = () => {
    const requests = Object.values(general);
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

const get = ({url,method},options=null) => {
    const token_type = localStorage.getItem('token_type');
    const access_token = localStorage.getItem('access_token');
    if(options) {url = url + options.concat }
    return axios({
        method,
        url,
        headers : {
            'content-type' : 'application/json',
            'authorization' : `${token_type} ${access_token}`
        }
    })
    .catch(err => console.log(`ERROR -> ${url}`,err));
}

export const getData = () => {
    return Promise.all(getPromises());
}

export const updateData = () => {
    return {
        playing : () => get(query.playing),
        album : (id) => get(query.album,{ concat : id })
    };
}
