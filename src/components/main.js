import React, {useState,useEffect} from "react";
import Styled from 'styled-components';

import { label, set_device_id } from './../utils';
import Player from './../api/player';

import Menu from './menu';
import NowPlayingBar from './nowPlayingBar';
import Home from './../pages/home';
import Playlist from "../pages/playlist";
import Album from "../pages/album";
import Artist from "../pages/artist";
import TopBar from "./topBar";
import RecentlyPlayed from "../pages/recentlyPlayed";

const StyledMain = Styled.div`
    display: grid;
    grid-template-columns: 14vw;
    grid-template-rows: auto;
    grid-template-areas:
      "sidebar main main main main main"
      "footer footer footer footer footer footer"
      "devicesBar devicesBar devicesBar devicesBar devicesBar devicesBar";
    overflow: hidden;
    font-family: "Lato";
    color: #F5F5F5;
    overflow: none;

    a {
        color: #F5F5F5;
    }

    .github {
        position: absolute;
        top:0;
        right:0;
        z-index:1000;
        width:120px;
        img {
            width: 120px;
            height: 120px;
        }
    }

    .search {
        padding: 8px 69px;
        input {
            width: 176px;
            height: 25px;
            border-radius: 27px;
        }
    }


    .menu-wrapper, .browser-wrapper {
        position: relative;
        overflow-x: hidden;
        overflow-y: auto;
        height: 92vh;
        background-repeat: no-repeat;
        background-attachment: local;

        &::-webkit-scrollbar {
            width: 1em;
            background: hsla(0,0%,100%,.3);
        }
        &::-webkit-scrollbar-thumb {
            min-height: 30px;
            max-height: none;
            background: hsla(0,0%,100%,.3);
        }
    }

    .menu-wrapper {
        grid-area: sidebar;
        background: #000;
        justify-content: stretch;
        &::-webkit-scrollbar {
            background: #000;
        }
    }

    .browser-wrapper {
        grid-area: main;
        linear-gradient(0deg, #0c0c0c 0%, #0c0c0c 80%, #0c0c0c 100%)
        .browser-inner-wrapper {
            max-width: 100%;
            margin-bottom: 1em;
        }
    }

    .now-playing-wrapper {
        position: relative;
        width: 100%;
        background-color: #282828;
        grid-area: footer;
    }

    .devices-bar-wrapper {
        grid-area: devicesBar;
    }
`

const Main = () => {
    const [player,setPlayer] = useState(null);
    const [uri,setUri] = useState(localStorage.getItem('lastUri') || 'home');
    const [currentTrack,setCurrentTrack] = useState(null);
    const [scroll,setScroll] = useState(0);
    const [title,setTopBar] = useState(null);

    // init - adds the sdk spotify player lib
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);
    }, [])

    // uri
    useEffect(() => {
        setUri(uri);
        localStorage.setItem('lastUri',uri);
        if(
            uri.indexOf('playlist') === -1 &&
            uri.indexOf('album') === -1 &&
            uri.indexOf('artist') === -1
        ) {
            setTopBar(
                label(uri)
            );
        }
        return () => {
            setUri(null);
        }
    }, [uri])

    // player
    useEffect(() => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            setPlayer(Player.init());
        };
        if(player) {
            player.addListener('ready', ({device_id}) => {
                set_device_id(device_id);
                // player.play({uri : 'spotify:track:3y4I9VECfNbDXYN2bXh9hV'});
            });
            player.addListener('player_state_changed', (state) => {
                if(state && state.track_window) {
                    setCurrentTrack({...state.track_window.current_track, ...state})
                } else {
                    console.log(state)
                }
            });
            player.connect();
        }
    },[player])

    const renderView = () => {
        if(uri) {
            if(uri.indexOf('home') !== -1) {
                return <Home player={player} setUri={setUri}/>
            } else if(uri.indexOf('recently-played') !== -1) {
                return <RecentlyPlayed player={player} setUri={setUri}/>
            } else if(uri.indexOf('spotify:playlist') !== -1) {
                return <Playlist uri={uri} player={player} setUri={setUri} setTopBar={setTopBar} currentTrack={currentTrack} />
            } else if(uri.indexOf('spotify:album') !== -1) {
                return <Album uri={uri} player={player} setUri={setUri} setTopBar={setTopBar} currentTrack={currentTrack} />
            } else if(uri.indexOf('spotify:artist') !== -1) {
                return <Artist uri={uri} player={player} setUri={setUri} setTopBar={setTopBar} currentTrack={currentTrack} />
            } else {
                return <h3>{uri}</h3>
            }
        }
    }

    const onScroll = (e) => setScroll(e.target.scrollTop);

    return (
        <StyledMain className="main">
            <div className="menu-wrapper">
                <Menu
                    setUri={setUri}
                    uri={uri}
                />
            </div>
            <div
                className="browser-wrapper"
                onScroll={onScroll}
            >
                <TopBar scroll={scroll} title={title} />
                {renderView()}
            </div>
            <div className="now-playing-wrapper">
                <NowPlayingBar currentTrack={currentTrack} player={player} />
            </div>
        </StyledMain>
    );
}

export default Main;
