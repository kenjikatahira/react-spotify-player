import {
    get_album,
    get_playlist_items,
    get_artist,
    get_playlist_cover_image,
    get_artist_top_tracks,
    get_a_playlist,
} from "./index";
import { orderList } from "../utils";

class Player {
    constructor(props) {
        this.defaultProperties(props);
    }
    getName() {
        return this.name;
    }
    async setArtist() {
        if (
            (this.track.artists && this.track.artists.length) ||
            this.track.item.artists.length
        ) {
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
            info = await get_a_playlist(
                ((playlist || {}).href || "").split("/")[5]
            );
        }
        const [item] = playlist.items;
        this.playlist = { images, ...playlist };
        if (info) this.playlist = { ...info.data, ...this.playlist };
        this.tracks = this.playlist.items.map((i) => i.track).filter((i) => i);
        this.images.playlist = playlist.images;
        this.uris = this.getUris();
    }
    async setTracks() {
        if ((this.context || {}).type === "album") {
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
        const { name, images, followers, id, owner } = this[type];

        this.view = {
            type,
            name,
            images,
            followers,
            id,
            owner,
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
        this.uris = [];
        this.view = {};
        this.tracks = [];
        this.track = track;
        this.context = track.context;
        this.uri = track.uri || (track.item || {}).uri;
        this.name = track.name || (track.item || {}).name;
        this.album = track.album || (track.item || {}).album;
        this.artist = track.artists || (track.item || {}).artists;
        this.duration = track.duration_ms || (track.item || {}).duration_ms;
        this.duration_ms = track.duration_ms || (track.item || {}).duration_ms;
        this.images = {
            artist: {},
            album: {},
            playlist: {},
        };
    }

    static async init(track) {
        const instance = new this(track);
        await instance.setTracks();
        await instance.setArtist();
        await instance.setView();
        instance.setTrackDuration();
        return instance;
    }
}

export default Player;
