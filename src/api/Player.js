import {
    get_album,
    get_playlist_items,
    get_artist,
    get_playlist_cover_image,
    get_artist_top_tracks,
    get_a_playlist
} from "./index";

import { orderList,getSession } from "../utils";
import { get_devices } from "./..//api";

class Player {
    constructor(props) {
        this.defaultProperties(props);
    }
    async setArtist() {
        if ( ((this.track || {}).artists && (this.track || {}).artists.length) || (((this.track || {}).item || {}).artists || {}).length) {
            try {
                let [first] = this.artist;
                const { data: artist } = await get_artist(first);
                this.artist = artist;
                this.images.artist = artist.images;
            } catch {
                // cai aqui quando entramos na pagina de um artista e tocamos as top tracks
                // Nessse caso a lista é o top trcaks do artista
                const { data: topArtistsTracks } = await get_artist_top_tracks(
                    this.artist
                    );
                this.tracks = topArtistsTracks.tracks;
            }
            this.uris = this.getUris();
        }
    }
    async setAlbum() {
        const { data: album } = await get_album(this.context || this.album);
        this.album = album;
        this.tracks = album.tracks.items.filter((i) => i);
        this.images.album = album.images;
        this.uris = this.getUris();
        this.view.type = "album";
    }
    async getPlaylist() {
        let info;
        const { data: playlist } = await get_playlist_items(this.context);
        const { data: images } = await get_playlist_cover_image(this.context);
        // try to get playlist's id
        if (((playlist || {}).href || "").split("/")[5]) {
            info = await get_a_playlist({uri : (playlist || {}).uri});
        }
        const [item] = playlist.items;
        this.playlist = { images, ...playlist };
        if (info) this.playlist = { ...info.data, ...this.playlist };
        this.tracks = this.playlist.items.map((i) => i.track).filter((i) => i);
        this.images.playlist = playlist.images;
        this.uris = this.getUris();
    }
    async setTracks() {
        if ((this.context || {}).type === "album" || !this.context) {
            await this.setAlbum();
        } else if ((this.context || {}).type === "playlist") {
            await this.getPlaylist();
        } else {
            await this.setArtist();
        }
    }
    setTrackDuration() {
        const minutes = Math.floor(this.duration / 60000);
        const seconds = ((this.duration % 60000) / 1000).toFixed(0);

        this.duration = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }
    setView() {
        const type = (this.context || {}).type || 'album';
        const { name, images, followers, id, owner,total_tracks,release_date,tracks } = this[type];
        this.view = {
            type,
            name,
            images,
            followers,
            id,
            owner,
            total_tracks,
            release_date,
            tracks
        };
    }
    getUris() {
        return orderList(
            this.uri,
            this.tracks.map((i) => i.uri)
        );
    }
    defaultProperties(track) {
        // properties
        this.track = track || {};
        this.uris = [];
        this.view = {};
        this.name = '';
        this.description = '';
        this.tracks = [];
        this.play = this.play;
        this.pause = this.pause;
        this.next = this.next;
        this.setView = this.setView;
        this.previous = this.previous;
        this.public = this.public;
        this.uri = (track || {}).uri || ((track || {}).item || {}).uri;
        this.name = (track || {}).name || ((track || {}).item || {}).name;
        this.album = (track || {}).album || ((track || {}).item || {}).album;
        this.artist = (track || {}).artists || ((track || {}).item || {}).artists;
        this.duration = (track || {}).duration_ms || ((track || {}).item || {}).duration_ms;
        this.duration_ms = (track || {}).duration_ms || ((track || {}).item || {}).duration_ms;
        this.images = [];
    }

    previous() {
        fetch('https://api.spotify.com/v1/me/player/previous',{
            method : 'POST',
            headers : {
                'content-type' : 'application/json',
                'authorization' : `${getSession().token_type} ${getSession().access_token}`
            }
        });
    }

    next() {
        fetch('https://api.spotify.com/v1/me/player/next',{
            method : 'POST',
            headers : {
                'content-type' : 'application/json',
                'authorization' : `${getSession().token_type} ${getSession().access_token}`
            }
        });
    }

    pause() {
        fetch('https://api.spotify.com/v1/me/player/pause',{
            method : 'PUT',
            headers : {
                'content-type' : 'application/json',
                'authorization' : `${getSession().token_type} ${getSession().access_token}`
            }
        });
    }

    async play({uri,tracks,device_id}) {
        console.log(`playyyyy`,{
            uri,tracks,device_id
        })
        let uris;
        if(tracks) {
            uris = orderList(uri,tracks.map(i => i.uri));
        } else {
            uris = [uri];
        }
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
            method: 'PUT',
            body: JSON.stringify({ uris : uris }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getSession().access_token}`
            }
        });
    }

    static async setTracks({uri}) {
        const instance = new this();
        if(uri.split(':').indexOf('album') >= 0) {
            const {data} = await get_album({uri});
            instance.tracks = data.tracks.items.filter((i) => i);
        } else if(uri.split(':').indexOf('playlist') >= 0) {
            const { data: playlist } = await get_playlist_items({uri});
            const { data: playlistCover } = await get_playlist_cover_image({uri});
            const { data: playlistInfo } = await get_a_playlist({uri});
            instance.id = playlist.id;
            instance.name = playlistInfo.name;
            instance.description = playlistInfo.description;
            instance.public = playlistInfo.public;
            instance.tracks = playlist.items.map((i) => i.track).filter((i) => i);
            instance.images = playlistCover;
        } else if(uri.split(':').indexOf('artist') >= 0) {
            console.log('PLAYER ARTIST IMPLEMENTAR')
        }
        return instance;
    }

    static init({setDeviceId}) {
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
            // getStatus({ position,duration,current_track })
        });

        player.connect();
    }
}

export default Player;
