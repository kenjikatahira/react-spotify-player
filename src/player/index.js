import { orderList,getSession } from '../utils';
import { getPlaylistItems, album, getTrack } from '../api';
import axios from 'axios';

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
    //  monta a playlist de acordo com o contexto
    const {track_uri} = track;
    const playlist_uri = track.uri || (track.item || {}).uri;
    let type,id,response, uris;
    console.log(`tem uri`,track.track_uri);

    if((track_uri || playlist_uri).split(':').includes('track')) {
        const res = await getTrack({ uri : track_uri});
        type = 'TRACK';
        response = await album({ uri : res.data.album.uri });
        uris = response.data.tracks.items.map(i => i.uri);
    } else if((track_uri || playlist_uri).split(':').includes('album')) {
        type = 'ALBUM';
        response = await album({ uri : (track_uri || playlist_uri)});
    } else if((track_uri || playlist_uri).split(':').includes('playlist')) {
        type = 'PLAYLIST';
        response = await getPlaylistItems({ uri : (track_uri || playlist_uri)});
        uris = response.data.items.map(i => !i.track.uri.split(':').includes('local') && i.track.uri).filter(i => i);
    }

    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${_device ? _device : ''}`, {
        method: 'PUT',
        body: JSON.stringify({ uris : orderList(track_uri,uris) }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getSession().access_token}`
        }
    });
}

/**
* Inicia a instancia do player do spotify
* @function init
**/
export const init = async ({_changed_}) => {
    console.log('____init___');
    const player = new window.Spotify.Player({
        playerInstance: new window.Spotify.Player({ name: 'Kenjicas Player_' }),
        name: 'Kenjicas Player',
        getOAuthToken: callback => callback(getSession().access_token),
        volume: 0.5
    });

    player.addListener('ready', ({device_id}) => {
        _device = device_id;
        console.log('Ready - Device ID', device_id);
    });

    // update status - action
    player.connect().then(() => {
        player.addListener('player_state_changed', _changed_);
    })

    return player;
}
