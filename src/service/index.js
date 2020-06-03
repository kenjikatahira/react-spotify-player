import axios from 'axios';

console.log('---service---');

class Service {

    token_type = localStorage.getItem('token_type');
    access_token = localStorage.getItem('access_token');

    user = 'https://api.spotify.com/v1/me';
    playing = 'https://api.spotify.com/v1/me/player/currently-playing';

    getPromises(requests=[]) {
        let promises = [];
        const setPromises = (url) => {
            return axios({
                method : 'get',
                url : url,
                headers : {
                    'content-type' : 'application/json',
                    'authorization' : `${this.token_type} ${this.access_token}`
                }
            })
        }

        promises = requests.map(setPromises);

        return promises;
    }

    getAll() {
        return axios.all(this.getPromises([this.user,this.playing]));
    }
}

const getUser = () => {
    const token_type = localStorage.getItem('token_type');
    const access_token = localStorage.getItem('access_token');
    return axios({
        method : 'get',
        url : 'https://api.spotify.com/v1/me',
        headers : {
            'content-type' : 'application/json',
            'authorization' : `${token_type} ${access_token}`
        }
    });
}

export default Service;
