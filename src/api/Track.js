import {
    get_album,
    get_playlist_items,
    get_artist,
    get_track,
    get_artist_top_tracks
} from './index';
import { orderList } from './../utils';

class Track {
    constructor(track) {
        this.track = track;
        this.name = track.name || (track.item||{}).name;
        this.artist = track.artists || (track.item || {}).artists;
        this.uri = track.uri || (track.item||{}).uri;
        this.album = track.album || (track.item||{}).album;
        this.duration_ms = track.duration_ms || (track.item || {}).duration_ms;
        this.duration = track.duration_ms || (track.item || {}).duration_ms;
        this.context = track.context;
        this.tracks = [];
        this.uris = [];
        this.images = {
            artist : {},
            album : {},
            playlist : {}
        };
    }
    getInfo() {
        const {name,uri,album,images,artist,duration} = this;
        return {
            name,
            album,
            artist,
            duration,
            images,
            uri
        }
    }
    getName() {
        return this.name;
    }
    async setArtist() {
        if((this.track.artists && this.track.artists.length)|| this.track.item.artists.length) {
            try {
                let [first] = this.artist;
                const { data : artist } = await get_artist(first);
                this.artist = artist;
                this.images.artist = artist.images;
            }
            catch {
                // cai aqui quando entramos na pagina de um artista e tocamos as top tracks
                // Nessse caso a lista é o top trcaks do artista
                const { data : topArtistsTracks } = await get_artist_top_tracks(this.artist);
                this.tracks = topArtistsTracks.tracks;
            }
        }
    }
    async setAlbum() {
        const { data : album } = await get_album(this.context || this.album);
        this.album = album;
        this.tracks = album.tracks.items;
        this.images.album = album.images;
        this.uris = this.getUris();
    }
    async getPlaylist() {
        console.log(this.context)
        const { data : playlist } = await get_playlist_items(this.context);
        this.playlist = playlist;
        this.tracks = playlist.items.map(i => i.track);
        this.images.playlist = playlist.images;
        this.uris = this.getUris();
    }
    async setTracks() {
        if((this.context || {}).type === 'album') {
            await this.setAlbum();
        } else if((this.context || {}).type === 'playlist') {
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
    getUris() {
        return orderList(this.uri,this.tracks.map(i => i.uri))
    }
    static async init(track) {
        const instance = new this(track);
        await instance.setTracks();
        await instance.setArtist();
        instance.setTrackDuration();
        return instance;
    }
}

export default Track;
