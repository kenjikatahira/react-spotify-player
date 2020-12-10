import {
    setSession,
    getSession,
    removeSession,
    isAuthenticated,
    formatTrackDuration
} from '../utils';

import {
    get_user,
    get_devices,
    get_playlists,
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
} from './../api';

import Player from '../api/player';

/**
 * Get the data for the route
 *
 * @function getViewRoute
 * @return {Object} data for the view
 */
export const getViewRoute = async ({uri}) => {
    console.log('----',uri)
    let content;
    if(uri === 'home') {
        content = await getHome();
    } else if(uri === 'recently-tracks') {
        content = await getRecentlyTracks();
    } else if(uri.split(':').indexOf('album') >= 0) {
        content = await fetchAlbum(uri);
    } else if(uri.split(':').indexOf('playlist') >= 0) {
        content = await fetchPlaylist(uri);
    } else if(uri.split(':').indexOf('artist') >= 0) {
        content = await fetchArtist(uri);
    }
    return content;
}

/**
 * Retrieves home data
 *
 * @function getHome
 * @return {Void}
 */
export const getHome = () => {
    return async dispatch => {

        try {
            const promises = [get_recently_tracks(),get_featured_playlist(),top_artists()];
            const [ { data : recentlyTracks }, { data : featuredPlaylists }, { data : topArtists } ] = await Promise.all(Object.values(promises));
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
            dispatch({
                type : 'GET_VIEW',
                payload : {
                    grid : {
                        featuredPlaylists : factoryPlaylists(featuredPlaylists),
                        top_artists : factoryTopArtists(topArtists),
                        recentlyTracks : factoryRecentlyTracks(recentlyTracks),
                    }
                }
            });
        } catch(e) {
            console.error(e);
        }
    }
}

/**
 * Retrieves user's recently played tracks
 *
 * @function getRecentlyTracks
 * @return {Void}
 */
export const getRecentlyTracks = () => {
    return dispatch => {
        get_recently_tracks().then( ({data}) => {
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
                    recentlyTracks : {
                        message : 'Recently Played',
                        items : albums,
                        type : 'recently-tracks'
                    }
                }
            }

            dispatch({
                type : 'GET_VIEW',
                payload : {
                    grid : factoryRecentlyTracks(data)
                }
            });
        })
        .catch(err => console.log(err));
    }
}

/**
 * Retrieves user's saved tracks
 *
 * @function getSavedTracks
 * @return {Void}
 */
export const getSavedTracks = () => {
    return dispatch => {
        get_saved_tracks().then( ({data}) => {
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

            dispatch({
                type : 'GET_VIEW',
                payload : {
                    grid : savedTracksFactory(data)
                }
            });
        })
        .catch(err => console.log(err));
    }
}

const totalDuration = (tracks) => {
    if(!tracks) return false;
    let initialValue = 0;
    const duration = tracks.reduce((total,{duration_ms}) => total + duration_ms,initialValue);

    return formatTrackDuration(Math.floor(duration / 60));
}

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

const fetchAlbum = async (uri) => {
    try {
        const {data: album} = await get_album({uri});
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

        return {
            type: 'album',
            header : {
                name : album.name,
                image : image,
                tracks : tableFactory(album).body,
                total_duration : totalDuration(album.tracks.items)
            },
            table : tableFactory(album)
        };
    } catch(e) {
        console.error(e);
    }
}

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
            return {
                artistAlbums : {
                    message : 'Albums',
                    type : 'artist',
                    items : albums.items.filter(i => {
                        if(!ids.includes(i.name) && i.album_type === 'album') {
                            ids.push(i.name);
                            return true;
                        }
                        return false;
                    })
                },
                artistSingles : {
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
            }
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
 * Retrieves user information
 *
 * @function getUser
 * @return {Void}
 */
export const getUser = () => {
    return dispatch => {
        get_user().then( data => {
            dispatch({
                type : 'GET_USER',
                payload : data.data
            });
        })
        .catch(e => console.log(e));
    }
}

/**
 * Retrieves devices avaiable
 *
 * @function getDevices
 * @return {Void}
 */
export const getDevices = () => {
    return dispatch => {
        get_devices().then(({data}) => {
            dispatch({
                type : 'GET_DEVICES',
                payload : data
            });
        })
        .catch(e => console.log(e));
    }
}

/**
 * Retrieves user's playlists
 *
 * @function getPlaylists
 * @return {Void}
 */
export const getPlaylists = () => {
    return dispatch => {
        get_playlists().then(({data}) => {
            dispatch({
                type : 'GET_PLAYLISTS',
                payload : data
            });
        })
        .catch(e => console.log(e));
    }
}

/**
 * Verifies if the user is logged
 * @function isLogged
 * @return {Void}
 */
export const isLogged = () => {
    return dispatch => {
        dispatch({
            type : 'ISLOGGED',
            payload : {
                status : isAuthenticated(),
                access_token : getSession().access_token
            }
        });
    }
}

/**
 * Sets the app's view ( browse,home,playlists,album )
 * @function setView
 * @param props contains the uri of a song or playlist
 * @return {Void}
 */
export const setView = (props) => {
    return async dispatch => {
        // salve o ultimo tpl acessado
        (props || {}).uri && window.localStorage.setItem('last_uri',props.uri);
        dispatch({
            type : 'SET_VIEW',
            payload : (props || {}).uri || 'home'
        });
    }
}

/**
 * Return object for a template
 * @function getView
 * @return {Void}
 */
export const getView = ({uri}) => {
    return async dispatch => {
        try {
            const view = await getViewRoute({uri});
            dispatch({
                type : 'GET_VIEW',
                payload : view
            });
        } catch(e) {
            console.error(e);
        }
    }
}

/**
 * Return a empty array
 * @function clearView
 * @return {Void}
 */
export const clearView = () => {
    return dispatch => {
        dispatch({
            type : 'CLEAR_VIEW',
            payload : []
        });
    }
}

/**
 * Clear the authorization data
 * @function logout
 * @return {Void}
 */
export const logout = () => {
    return dispatch => {
        removeSession();
        dispatch({
            type : 'LOGOUT',
            payload : {
                status : false,
                access_token : false
            }
        });
    }
}

/**
 * Sets token for the logged user
 * @function login
 * @param response authentication
 * @return {Void}
 */
export const login = (response) => {
    return dispatch => {
        setSession(response);
        dispatch({
            type : 'LOGIN',
            payload : {
                status : true,
                access_token : getSession().access_token
            }
        });
    }
}

export const getPlayer = () => {
    return dispatch => {
        const player = Player.init();
        dispatch({
            type : 'GET_PLAYER',
            payload : player
        });
    }
}

/**
 * Set current track and context data
 * @function setCurrentState
 * @param response changed state
 * @return {Void}
 */
export const setCurrentState = (state) => {
    return dispatch => {
        const {
            position,
            duration,
            paused,
            shuffle,
            repeat_mode,
            track_window : {
                current_track,
                next_tracks,
                previous_tracks
            }
        } = state;

        dispatch({
            type : 'SET_CURRENT_STATE',
            payload : {
                position,
                duration,
                paused,
                shuffle,
                repeat_mode,
                current_track,
                next_tracks,
                previous_tracks
            }
        });
    }
}
