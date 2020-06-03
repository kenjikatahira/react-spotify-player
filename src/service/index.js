import axios from 'axios';

const endpoint = {
    user : 'https://api.spotify.com/v1/me',
    playing : 'https://api.spotify.com/v1/me/player/currently-playing'
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
    }

    promises = requests.map(setPromises);

    return promises;
}

export const spotify = () => {
    return axios.all(getPromises(requests));
}
