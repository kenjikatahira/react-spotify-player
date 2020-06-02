import axios from 'axios';

const getList = () => {
    return axios({
        method: 'get',
        baseURL : 'https://disease.sh/v2/countries/'
    });
}

export default {
    getList
}
