import {
    get_album,
    get_playlist_items,
    get_artist,
    get_playlist_cover_image,
    get_artist_top_tracks,
    get_a_playlist
} from "./index";

import { orderList, getSession, formatTrackDuration } from "../utils";

const totalDuration = (tracks) => {
    if(!tracks) return false;
    let initialValue = 0;
    const duration = tracks.reduce((total,{duration_ms}) => total + duration_ms,initialValue);

    return formatTrackDuration(duration);
}

const fetchPlaylist = async (uri) => {
    let playlistData = {};
    const promises = {
        playlist : get_playlist_items({uri}),
        playlistInfo : get_a_playlist({uri}),
        playlistCover : get_playlist_cover_image({uri}),
    }
    const [ playlist, playlistInfo, playlistCover ] = await Promise.all(Object.values(promises));

    playlistData.type = 'playlist';
    playlistData.images = playlistCover.data;
    playlistData.id = playlist.data.id;
    playlistData.tracks = playlist.data.items.map((i) => i.track).filter((i) => i);

    playlistData.total_duration = totalDuration(playlistData.tracks);
    playlistData.owner = playlistInfo.data.owner;
    playlistData.followers = playlistInfo.data.followers.total;
    playlistData.name = playlistInfo.data.name;
    playlistData.description = playlistInfo.data.description;
    playlistData.public = playlistInfo.data.public;


    playlistData.tracks = playlistData.tracks.map(i => {
        return {
            id : i.id,
            name : i.name,
            duration_ms : formatTrackDuration(i.duration_ms),
            album : i.album,
            artists : i.artists,
            uri : i.uri,
        }
    });

    playlistData.table = {
        head :  ['name','artist','album','duration'],
        body  : playlistData.tracks
    }

    return playlistData;
}

const fetchAlbum = async (uri) => {
    let album = {};
    const {data} = await get_album({uri});
    album.type = 'album';
    album.tracks = data.tracks.items.filter((i) => i);
    return album;
}

const fetchArtist = async (uri) => {
    let artist = {};
    const { data } = await get_artist({uri});
    const { data : topTracks } = await get_artist_top_tracks({uri});
    artist.type = 'artist';
    artist.name = data.name;
    artist.images = data.images;
    if(!artist.tracks) {
        artist.tracks = topTracks.tracks;
        artist.total_duration = totalDuration(artist.tracks);
    }

    artist.tracks = artist.tracks.map(i => {
        return {
            id : i.id,
            name : i.name,
            duration_ms : formatTrackDuration(i.duration_ms),
            uri : i.uri,
        }
    });

    artist.table = {
        head :  ['name','duration'],
        body  : artist.tracks
    }

    return artist;
}

const getView = async ({uri}) => {
    let content;
    if(uri.split(':').indexOf('album') >= 0) {
        content = await fetchAlbum(uri);
    } else if(uri.split(':').indexOf('playlist') >= 0) {

        content = await fetchPlaylist(uri);

    } else if(uri.split(':').indexOf('artist') >= 0) {
        content = await fetchArtist(uri);
    }

    return content;
}

const init = ({setDeviceId}) => {
    console.log('____init___');

    const player = new window.Spotify.Player({
        playerInstance: new window.Spotify.Player({ name: 'Kenjicas Player_' }),
        name: 'Kenjicas Player',
        getOAuthToken: callback => callback(getSession().access_token)
    });

    console.log('instance -',player)

    player.addListener('ready', ({device_id}) => {
        setDeviceId(device_id);
        console.log('Ready - Device ID', device_id);
    });

    player.on('authentication_error', ({ message }) => {
        console.error('Failed to authenticate', message);
    });

    player.on('initialization_error', ({ message }) => {
        console.error('Failed to initialize', message);
    });

    // update status - action
    player.addListener('player_state_changed', ({ position,duration,track_window: { current_track } }) => {
        // console.log({ position,duration,current_track })
    });

    player.connect();

    player.play = play;
    player.next = next;
    player.previous = previous;
    player.pause = pause;

    return player;
}

const previous = () => {
    fetch('https://api.spotify.com/v1/me/player/previous',{
        method : 'POST',
        headers : {
            'content-type' : 'application/json',
            'authorization' : `${getSession().token_type} ${getSession().access_token}`
        }
    });
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

const play = async ({uri,uris,device_id}) => {
    console.log(`playyyyy`,{
        uri,uris,device_id
    })

    let queue = orderList(uri,uris.map(({uri}) => uri));

    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
        method: 'PUT',
        body: JSON.stringify({ uris : queue || [uri] }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getSession().access_token}`
        }
    });
}

export default {
    init,
    getView
}
