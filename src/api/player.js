import { orderList, getSession, get_device_id } from "../utils";

const init = () => {
    const player = new window.Spotify.Player({
        playerInstance: new window.Spotify.Player({ name: 'Kenjicas Player' }),
        name: 'Kenjicas Player',
        getOAuthToken: callback => callback(getSession().access_token)
    });

    player.play = play;
    player.next = next;
    player.previous = previous;
    player.pause = pause;
    player.resume = resume;

    return player;
}

const previous = (lastUri) => {
    try {
        fetch('https://api.spotify.com/v1/me/player/previous',{
            method : 'POST',
            headers : {
                'content-type' : 'application/json',
                'authorization' : `${getSession().token_type} ${getSession().access_token}`
            }
        });
    } catch(err) {
        play({uri : lastUri})
    }

}

const next = () => {
    fetch('https://api.spotify.com/v1/me/player/next',{
        method : 'POST',
        headers : {
            'content-type' : 'application/json',
            'authorization' : `${getSession().token_type} ${getSession().access_token}`
        }
    });
}

const pause = () => {
    fetch('https://api.spotify.com/v1/me/player/pause',{
        method : 'PUT',
        headers : {
            'content-type' : 'application/json',
            'authorization' : `${getSession().token_type} ${getSession().access_token}`
        }
    });
}

const resume = async () => {
   fetch(`https://api.spotify.com/v1/me/player/play?device_id=${get_device_id()}`, {
       method: 'PUT',
       headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${getSession().access_token}`
       }
   });
}

const play = async ({uri,uris}) => {
    let queue = orderList(uri,(uris || []).map(({uri}) => uri));
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${get_device_id()}`, {
        method: 'PUT',
        body: JSON.stringify({ uris : queue.length ? queue : [uri] }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getSession().access_token}`
        }
    });
}

export default {
    init
}
