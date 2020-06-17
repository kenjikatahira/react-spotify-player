import { getSession }  from '../utils';
import { orderList } from '../utils';

let _device;

export const volume = () => {
    fetch('https://api.spotify.com/v1/me/player/volume',{
        method : 'PUT',
        params : {
            volume_percent : 0
        },
        headers : {
            'content-type' : 'application/json',
            'authorization' : `${getSession().token_type} ${getSession().access_token}`
        }
    })
}

export const previous = () => {
    fetch('https://api.spotify.com/v1/me/player/previous',{
        method : 'POST',
        headers : {
            'content-type' : 'application/json',
            'authorization' : `${getSession().token_type} ${getSession().access_token}`
        }
    });
}

export const next = () => {
    fetch('https://api.spotify.com/v1/me/player/next',{
        method : 'POST',
        headers : {
            'content-type' : 'application/json',
            'authorization' : `${getSession().token_type} ${getSession().access_token}`
        }
    });
}

export const pause = () => {
    fetch('https://api.spotify.com/v1/me/player/pause',{
        method : 'PUT',
        headers : {
            'content-type' : 'application/json',
            'authorization' : `${getSession().token_type} ${getSession().access_token}`
        }
    });
}

export const play = async (track) => {
    let uri;
    if(typeof track === 'object') {
        uri = track.uri ? track.uri : track.item.uri;
    }
    const album_id = track.album_id || (track.album || {}).id;
    if(album_id) {
        fetch('https://api.spotify.com/v1/albums/' + album_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getSession().access_token}`
            }
        })
        .then(response => response.json())
        .then(album => {
            fetch(`https://api.spotify.com/v1/me/player/play?device_id=${_device ? _device : ''}`, {
                method: 'PUT',
                body: JSON.stringify({ uris : orderList(uri,album.tracks.items.map(i => i.uri)), position_ms: track.position }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getSession().access_token}`
                }
            });
        })
    } else {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${_device ? _device : ''}`, {
            method: 'PUT',
            body: JSON.stringify({ uris : [uri] }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getSession().access_token}`
            }
        });
    }
}

/*
* Inicia a instancia do player do spotify
* @function init
*/
export const init = async ({currentTrack,getStatus}) => {
    console.log('____init___');
    const player = new window.Spotify.Player({
        playerInstance: new window.Spotify.Player({ name: 'Kenjicas Player_' }),
        name: 'Kenjicas Player',
        getOAuthToken: callback => callback(getSession().access_token),
        volume: 0.5
    });

    player.connect().then(() => {
        player.addListener('ready', ({device_id}) => {
            _device = device_id;
            console.log('Ready - Device ID', device_id);
        });
    });

    // update status - action
    player.addListener('player_state_changed', ({ position,duration,track_window: { current_track } }) => getStatus({ position,duration,current_track }));

}
