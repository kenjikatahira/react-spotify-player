import React from "react";
import { connect } from "react-redux";
import Styled from 'styled-components';

import {
    logout,
    getUser,
    getPlaylists,
    setView,
    getPlayer,
    getRecentlyTracks
} from "../../actions";

import View from "../view";
import Login from "../login";
import Menu from "../menu";
import NowPlayingBar from "../nowPlayingBar";

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
class Main extends React.Component {
    constructor() {
        super();
        this.state ={
            initiated : false
        }
    }
    /**
     * Initial configuration
     * @function run
     * @return {Void}
     */
    run() {
        this.props.getRecentlyTracks();
        this.props.getPlayer();
        this.setState({
            initiated : true
        });
    }
    UNSAFE_componentWillUpdate() {
        !this.state.initiated  && this.props.logged.status === true && this.run();
    }
    componentDidMount() {
        window.onSpotifyWebPlaybackSDKReady = () => {
            const lastPage = window.localStorage.getItem('last_uri');
            this.props.setView(lastPage ? { uri : lastPage } : '');
            // Seta a primeira view
            // Force start from home
            // this.props.setView('home');
            // faz a primeira busca da ultima musica tocada
        };
    }
    onSearchChange(ev) {
        console.log(ev);
    }
    render() {
        const {
            logged,
            uri,
            tracks,
            getPlaylists,
            logout,
            setView,
            playlists
        } = this.props;

        if(!logged.status) {
            return <Login />;
        } else {
            return (
                <StyledMain className="main">
                    <div className="menu-wrapper">
                        <Menu
                            getPlaylists={getPlaylists}
                            logout={logout}
                            setView={setView}
                            playlists={playlists}
                            uri={uri}
                        />
                    </div>
                    <div className="browser-wrapper">
                        <div className="browser-inner-wrapper">
                            <View
                                uri={uri}
                                tracks={tracks}
                            />
                        </div>
                    </div>
                    <div className="now-playing-wrapper">
                        <NowPlayingBar />
                    </div>
                </StyledMain>
            );
        }

    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        logged: state.logged,
        playlists: state.playlists,
        uri: state.uri,
        devices: state.devices
    };
};

export default connect(mapStateToProps, {
    logout,
    getUser,
    getPlaylists,
    setView,
    getPlayer,
    getRecentlyTracks
})(Main);
