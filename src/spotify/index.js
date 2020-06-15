import axios from 'axios';
import { getSession }  from '../utils';

const headers = {
    'content-type' : 'application/json',
    'authorization' : `${getSession().token_type} ${getSession().access_token}`
}

const commands = {
    play : {
        method : 'put',
        url : 'https://api.spotify.com/v1/me/player/play'
    },
    pause : {
        method : 'put',
        url : 'https://api.spotify.com/v1/me/player/pause'
    },
    next : {
        method : 'post',
        url : 'https://api.spotify.com/v1/me/player/next'
    },
    previous : {
        method : 'post',
        url : 'https://api.spotify.com/v1/me/player/previous'
    },
    volume : {
        method : 'put',
        url : 'https://api.spotify.com/v1/me/player/volume',
        params : {
            volume_percent : 0
        }
    }
}

export const next = (update) => {
    run('next');
    update();
}

export const previous = (update) => {
    run('previous');
    update();
}

export const pause = (update) => {
    run('pause');
    update();
}

export const play = (update) => {
    run('play');
    update();
}

const run = (action) => {
    let config = commands[action];
    Object.assign(config,{ headers });
    axios(config);
}
