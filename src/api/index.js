import {
    formatTrackDuration
} from '../utils';

import {
    get_featured_playlist,
    get_saved_tracks,
    get_recently_tracks,
    get_a_playlist,
    top_artists,
    get_album,
    get_playlist_items,
    get_artist,
    get_related_artists,
    get_artists_albums,
    get_playlist_cover_image,
    get_artist_top_tracks,
    get_playlists,
    get_user,
    get_following,
    get_new_releases,
    get_search
} from './spotify';

/**
 * Get the data for the route
 *
 * @function getViewRoute
 * @return {Object} data for the view
 */
export const getViewRoute = async ({uri}) => {
    let content;
    if(uri === 'home') {
        content = await fetchHome();
    } else if(uri === 'browse') {
        content = await fetchBrowse({uri});
    } else if(uri === 'featured-playlists-countries') {
        content = await fetchCountries();
    } else if(uri === 'liked-songs') {
        content = await fetchSavedSongs();
    } else if(uri === 'recently-played') {
        content = await fetchRecentlyTracks();
    } else if(uri.indexOf('spotify:album') >= 0) {
        content = await fetchAlbum(uri);
    } else if(uri.indexOf('spotify:playlist') >= 0) {
        content = await fetchPlaylist(uri);
    } else if(uri.indexOf('spotify:artist') >= 0) {
        content = await fetchArtist(uri);
    } else if(uri === 'artists-list') {
        content = await fetchFollowing(uri)
    }
    return content;
}

/**
 * Retrieves data based on search term
 *
 * @function fetchSearchTerm
 * @return {Object} grid layout with artist,album and track suggestions
 */
export const fetchSearchTerm = async ({searchTerm}) => {
    try {
        const promises = [
            get_search({query: searchTerm,type:'artist',size: 3}),
            get_search({query: searchTerm,type:'album'}),
            get_search({query: searchTerm,type:'track',size: 4})
        ];

        const [
            {data:artist},
            {data:album},
            {data:track}
        ] = await Promise.all(Object.values(promises));

        const searchFactory = (response) => {
            let n;
            Object.entries(response).forEach(([key,value]) => {
                n = {
                    message : key,
                    items : value.items
                }
            });
            return n;
        }


        return {
            type : 'search',
            grid : {
                track : searchFactory(track),
                artist : searchFactory(artist),
                album : searchFactory(album),
            }
        }

    } catch(e) {
        throw new Error(e);
    }
}

/**
 * Retrieves browse list
 *
 * @function fetchBrowse
 * @return {Void}
 */
export const fetchBrowse = async ({uri,country}) => {
    try {
        const promises = [get_new_releases(country)];
        let [{data}] = await Promise.all(Object.values(promises));

        data = Object.values(data)[0];

        const newReleasesFactory = (response) => {
            return {
                type : uri,
                message : 'New Releases',
                items : response.items
            }
        }
        return {
            type : 'browse',
            grid : {
                newReleases : newReleasesFactory(data)
            }
        }
    } catch(e) {
        throw new Error(e);
    }
}
/**
 * Retrieves home data
 *
 * @function fetchHome
 * @return {Void}
 */
export const fetchHome = async () => {
    try {
        const promises = [get_recently_tracks(),get_user(),top_artists()];
        const [ { data : recentlyTracks }, { data : user }, { data : topArtists } ] = await Promise.all(Object.values(promises));
        const { data : featuredPlaylists } = await get_featured_playlist(user.country);
        /**
         * Model array of recently tracks to albums for the homepage view
         *
         * @function factoryRecentlyTracks
         * @return {Void}
         */
        const factoryRecentlyTracks = (response) => {
            let  ids = [];
            let albums = response.items.map(item => item.track.album);

            albums = albums.filter(item => {
                if(ids.includes(item.id)) return false;
                ids.push(item.id);
                return item;
            });

            return {
                href : response.href,
                message : 'Recently Played',
                items : albums,
                type : 'recently-played'
            }
        }
        /**
         * Model the playlist response for the homepage view
         *
         * @function factoryPlaylists
         * @return {Void}
         */
        const factoryPlaylists = (response) => {
            return {
                message : response.message,
                items : response.playlists.items,
                type : 'playlists'
            }
        }
        /**
         * Model user's top artists response for the homepage view
         *
         * @function factoryTopArtists
         * @return {Void}
         */
        const factoryTopArtists = (response) => {
            return {
                message : 'Top Artists',
                items : response.items,
                type : 'top-artists'
            };
        }

        return {
            type : 'home',
            grid : {
                featuredPlaylists : factoryPlaylists(featuredPlaylists),
                top_artists : factoryTopArtists(topArtists),
                recentlyTracks : factoryRecentlyTracks(recentlyTracks),
            }
        }
    } catch(e) {
        throw new Error(e);
    }
}

/**
 * Retrieves countries playlists data
 *
 * @function fetchCountries
 * @return {Void}
 */
export const fetchCountries = async () => {
    try {
        let _countries = ['NZ','CH','CA','US','IT','FR','JP','RU','IS'];
        let countries = ['NZ','CH','CA','US','IT','FR','JP','RU','IS'];

        countries = countries.map(async (country) => await get_featured_playlist(country));

        const resolves = await Promise.all(countries)

        /**
         * Model the playlist response for the homepage view
         *
         * @function factoryPlaylists
         * @return {Void}
         */
        const factoryPlaylists = (resolves) => {
            const labels = {
                'BR' : 'Brasil',
                'CH' : 'Chile',
                'CA' : 'Canada',
                'US' : 'United States',
                'RU' : 'Russia',
                'IT' : 'Italy',
                'JP' : 'Japan',
                'NZ' : 'New Zealand'
            }
            return resolves.map(({data},index) => {
                return {
                    message :`${data.message} ${labels[_countries[index]] ? ' - ' + labels[_countries[index]] : ''}`,
                    items : data.playlists.items,
                    type : 'playlists'
                }
            })
        }

        return {
            type : 'home',
            grid : factoryPlaylists(resolves)
        }
    } catch(e) {
        throw new Error(e);
    }
}


/**
 * Retrieves user's saved tracks
 *
 * @function fetchSavedSongs
 * @return {Void}
 */
export const fetchSavedSongs = async() => {
    try {
        const { data } = await get_saved_tracks();
        /**
         * Model array of recently tracks to albums for the saved tracks
         *
         * @function savedTracksFactory
         * @return {Void}
         */
        const savedTracksFactory = (response) => {
            let tracks = response.items.map(item => item.track);

            tracks = tracks.map(item => {
                return {
                    images : item.album.images,
                    name : item.name,
                    uri : item.uri,
                    album : {
                        uri : item.album.uri
                    },
                    artists : item.artists
                };
            });

            return {
                savedTracks : {
                    message : 'Saved Tracks',
                    type : 'saved-tracks',
                    items : tracks
                }
            }
        }

        return {
            grid : savedTracksFactory(data)
        }
    } catch(e) {
        throw new Error(e);
    }

}

/**
 * Calculate a album or tracklist duration
 *
 * @function totalDuration
 * @return {String} Formated duration
 */
const totalDuration = (tracks) => {
    if(!tracks) return false;
    let initialValue = 0;
    const duration = tracks.reduce((total,{duration_ms}) => total + duration_ms,initialValue);

    return formatTrackDuration(Math.floor(duration / 60));
}

/**
 * Retrieves a playlist
 *
 * @function fetchPlaylist
 * @return {Object} playlist's data
 */
const fetchPlaylist = async (uri) => {
    try {
        let playlistData = {};
        const promises = {
            playlist : get_playlist_items({uri}),
            playlistInfo : get_a_playlist({uri}),
            playlistCover : get_playlist_cover_image({uri}),
        }
        const [ playlist, playlistInfo, playlistCover ] = await Promise.all(Object.values(promises));

        const [image] = playlistCover.data;

        playlistData.tracks = playlist.data.items.map((i) => i.track).filter((i) => i);

        const tableFactory = (data) => {
            const trackModel = (i) => {
                return {
                    id : i.id,
                    name : i.name,
                    duration_ms : formatTrackDuration(i.duration_ms),
                    album : i.album,
                    artists : i.artists,
                    uri : i.uri,
                }
            }
            return {
                head :  ['name','artist','album','duration'],
                body  : data.tracks.map(trackModel)
            }
        }

        return {
            type : 'playlist',
            header : {
                type : 'playlist',
                name : playlistInfo.data.name,
                image: image,
                tracks : tableFactory(playlistData).body,
                total_duration : totalDuration(playlistData.tracks),
                owner : playlistInfo.data.owner,
                followers : playlistInfo.data.followers.total,
                description : playlistInfo.data.description,
                public : playlistInfo.data.public
            },
            table : tableFactory(playlistData)
        }
    } catch(e) {
        console.error(e);
    }
}

/**
 * Retrieves a album
 *
 * @function fetchAlbum
 * @return {Object} album's data
 */
const fetchAlbum = async (uri) => {
    try {
        const {data: album} = await get_album({uri});
        const { data : albums } = await get_artists_albums({uri : album.artists[0].uri});

        const [image] = album.images;

        const tableFactory = (album) => {
            const trackModel = (i) => {
                return {
                    id : i.id,
                    name : i.name,
                    duration_ms : formatTrackDuration(i.duration_ms),
                    uri : i.uri,
                    artists : i.artists
                }
            }
            return {
                head :  ['name','artist','duration'],
                body  : album.tracks.items.map(trackModel)
            }
        }

        const artistAlbumsFactory = (albums) => {
            const ids = [];
            const artistAlbums = {}

            const _albums = {
                message : 'More by ' + album.artists[0].name,
                type : 'artist',
                items : albums.items.filter((i , index) => {
                    // Remove repeated albums and itself from the list . Limited by four albums only
                    if(!ids.includes(i.name) && i.album_type === 'album' && i.id !== album.id && index <= 4) {
                        ids.push(i.name);
                        return true;
                    }
                    return false;
                })
            }

            if(_albums.items.length) {
                artistAlbums._albums = _albums;
            }

            return artistAlbums;
        }

        return {
            type: 'album',
            releaseDate : album.release_date.replace(/(\d{4})-\d{2}-\d{2}/g,'$1'),
            label : album.label,
            header : {
                type : 'album',
                artists : album.artists,
                name : album.name,
                image : image,
                tracks : tableFactory(album).body,
                total_duration : totalDuration(album.tracks.items),
                releaseDate : album.release_date.replace(/(\d{4})-\d{2}-\d{2}/g,'$1')
            },
            table : tableFactory(album),
            grid : artistAlbumsFactory(albums)
        };
    } catch(e) {
        console.error(e);
    }
}

/**
 * Retrieves a artist
 *
 * @function fetchArtist
 * @return {Object} artist's data
 */
const fetchArtist = async (uri) => {
    try {
        let artist = {};
        const { data } = await get_artist({uri});
        const { data : topTracks } = await get_artist_top_tracks({uri});
        const { data : albums } = await get_artists_albums({uri});
        const { data : relatedArtists } = await get_related_artists({uri});

        const [image] = data.images;

        if(!artist.tracks) {
            artist.tracks = topTracks.tracks;
        }

        const artistAlbumsFactory = (albums) => {
            const ids = [];
            const artistAlbums = {}

            const _albums = {
                message : 'Albums',
                type : 'artist',
                items : albums.items.filter(i => {
                    if(!ids.includes(i.name) && i.album_type === 'album') {
                        ids.push(i.name);
                        return true;
                    }
                    return false;
                })
            }

            const _singles = {
                message : 'Singles',
                type : 'artist',
                items : albums.items.filter(i => {
                    if(!ids.includes(i.name) && i.album_type === 'single') {
                        ids.push(i.name);
                        return true;
                    }
                    return false;
                })
            }

            if(_albums.items.length) {
                artistAlbums._albums = _albums;
            }
            if(_singles.items.length) {
                artistAlbums._singles = _singles;
            }

            return artistAlbums;
        }

        const tableFactory = (artist) => {
            const trackModel = (i) => {
                return {
                    id : i.id,
                    name : i.name,
                    duration_ms : formatTrackDuration(i.duration_ms),
                    uri : i.uri
                }
            }
            return {
                head :  ['Popular'],
                body  : artist.tracks.map(trackModel)
            }
        }

        return {
            type : 'artist',
            header : {
                type : 'artist',
                name : data.name,
                image : image,
                tracks : tableFactory(artist).body
            },
            table : tableFactory(artist),
            grid : artistAlbumsFactory(albums),
            relatedArtists : relatedArtists
        };

    } catch(e) {
        console.error(e);
    }
}

/**
 * Retrieves user's playlists
 *
 * @function fetchPlaylists
 * @return {Object} Playlists
 */
export const fetchPlaylists = async () => {
    try {
        const { data } = await get_playlists();
        return data;
    } catch(e) {
        console.error(e);
    }
}

/**
 * Model array of recently tracks to albums for the homepage view
 *
 * @function fetchRecentlyTracks
 * @return {Void}
 */
export const fetchRecentlyTracks = async () => {
    try {

        const { data } = await get_recently_tracks();

        const factoryRecentlyTracks = (response) => {
            let  ids = [];
            let albums = response.items.map(item => item.track.album);

            albums = albums.filter(item => {
                if(ids.includes(item.id)) return false;
                ids.push(item.id);
                return item;
            });

            return {
                href : response.href,
                message : 'Recently Played',
                items : albums,
                type : 'recently-played'
            }
        }

        return {
            grid : {
                recently : factoryRecentlyTracks(data)
            }
        };

    } catch(e) {
        console.error(e);
    }
}


/**
 * Retrieves user's followings
 *
 * @function fetchFollowing
 * @return {Object} User info
 */
export const fetchFollowing = async (uri) => {
    try {
        const { data } = await get_following(uri);

        const followingFactory = (response) => {
            const data = Object.values(response)[0];
            return {
                following : {
                    type : uri,
                    message : 'Your Artists',
                    items : data.items
                }
            }
        }

        return {
            grid : followingFactory(data)
        }
    } catch(e) {
        console.error(e)
    }
}

/**
 * Retrieves user's info
 *
 * @function getUser
 * @return {Object} User info
 */
export const getUser = async () => {
    try {
        const { data } = await get_user();
        return data;
    } catch(e) {
        console.error(e)
    }
}
