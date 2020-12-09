import React, {useState,useEffect} from "react";
import Styled from 'styled-components';

import { setSession, getSession, set_device_id } from './../utils';
import Player from './../api/player';

import Login from './login';
import Menu from './menu';
import NowPlayingBar from './nowPlayingBar';
import Home from './../pages/home';
import Playlist from "../pages/playlist";

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
        height: 89vh;

        &::-webkit-scrollbar {
            width: 1em;
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
        background: rgb(2,0,36);
        background: linear-gradient(0deg, rgba(28,28,28,1) 0%, rgba(28,28,28,1) 70%, rgba(87,87,87,1) 100%);
        background-position: fixed;
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
    const [state,setState] = useState({ isLogged : false });
    const [player,setPlayer] = useState(null);
    const [uri,setUri] = useState(null);
    const [currentTrack,setCurrentTrack] = useState(null);

    // init
    useEffect(() => {
        if(getSession().access_token) {
            setState({
                isLogged : true
            });
        }
        init();
    }, [state.isLogged])

    // init
    useEffect(() => {
        setUri(uri);
        return () => {
            setUri(null);
        }
    }, [uri])

    // player
    useEffect(() => {
        if(player) {
            player.addListener('ready', ({device_id}) => {
                set_device_id(device_id);
                // player.play({uri : 'spotify:track:3y4I9VECfNbDXYN2bXh9hV'});
            });
            player.addListener('player_state_changed', (state) => {
                console.log(state)
                setCurrentTrack({...state.track_window.current_track,...state})
            });
            player.connect();
        }
    },[player])

    const init = () => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            console.log('SDK ready...')
            if(!state.initiated  && state.isLogged === true) {
                setPlayer(Player.init());
                setState({
                    initiated : true,
                    isLogged : state.isLogged
                });
                setUri('home');
            };
        };
    }

    const onLogin = (response) => {
        setSession(response);
        setState({
            isLogged : response.access_token !== '' ? true : false
        });
    }

    const renderView = () => {
        if(uri) {
            if(uri.indexOf('home') !== -1) {
                return <Home player={player} setUri={setUri} />
            } else if(uri.indexOf('playlist') !== -1) {
                return <Playlist player={player} setUri={setUri} />
            }
        }
    }

    if(!state.isLogged) {
        return <Login onLogin={onLogin}/>;
    } else {
        return (
            <StyledMain className="main">
                <div className="menu-wrapper">
                    <Menu
                        setUri={setUri}
                        uri={uri}
                    />
                </div>
                <div className="browser-wrapper">
                    {renderView()}
                </div>
                <div className="now-playing-wrapper">
                    <NowPlayingBar currentTrack={currentTrack} player={player} />
                </div>
            </StyledMain>
        );
    }
}

export default Main;
