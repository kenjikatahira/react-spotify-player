import axios from 'axios';

const getUser = () => {
    const token_type = localStorage.getItem('token_type');
    const access_token = localStorage.getItem('access_token');
    console.log(`${token_type} ${access_token}`)

    return axios({
        method : 'get',
        url : 'https://api.spotify.com/v1/me',
        headers : {
            'content-type' : 'application/json',
            'authorization' : `${token_type} ${access_token}`
        }
    })
}

export default {
    getUser
}
