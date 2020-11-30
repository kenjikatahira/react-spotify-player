import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import {
    logout,
    getUser,
    getPlaylists,
    setView,
    setDeviceId,
    getPlayer
} from "../../actions";

import View from "../view";
import Login from "../login";
import Menu from "../menu";
import Controls from "../controls";

const StyledMain = styled.main`
    overflow: hidden;
    font-family: "Lato";
    color: #F5F5F5;
    overflow: none;

    .search {
        padding: 8px 69px;
        input {
            width: 176px;
            height: 25px;
            border-radius: 27px;
        }
    }

    .menu, .browser {
        position: relative;
        height: 92vh;
        overflow-x: hidden;
        overflow-y: auto;

        &::-webkit-scrollbar {
            width: 1em;
        }
        &::-webkit-scrollbar-thumb {
            background-color: rgba(73, 73, 73);
            outline: 1px solid slategrey;
        }
    }

    .controls-wrapper {
        position: relative;
        width: 100%;
        height: 8vh;
        background-color: #282828;
    }

    .browser {
        background: rgb(2,0,36);
        background: linear-gradient(0deg, rgba(28,28,28,1) 0%, rgba(28,28,28,1) 70%, rgba(87,87,87,1) 100%);
        background-position: fixed;
    }

    .debug {
        padding: 3px;
        background: black;
        color: #fff;
        position: absolute;
        bottom:0;
        right:0;
    }
`;

class Main extends React.Component {
    constructor() {
        super();
        /**
         * Aplication Initiated Flag
         * @type {Boolean}
         */
        this.initiated = false;
    }
    /**
     * Initial configuration
     * @function run
     * @return {Void}
     */
    run() {
        const { currentTrack, setDeviceId } = this.props;
        this.props.getPlayer({ currentTrack, setDeviceId })
        this.initiated = true;
    }
    UNSAFE_componentWillUpdate() {
        !this.initiated  && this.props.logged.status === true && this.run();
    }
    componentDidMount() {
        window.onSpotifyWebPlaybackSDKReady = () => {
            const lastPage = window.localStorage.getItem('last_uri');
            // Seta a primeira view
            this.props.setView(lastPage ? { uri : lastPage} : '');
        };
    }
    onSearchChange(ev) {
        console.log(ev);
    }
    render() {
        const {
            logged,
            uri,
            tracks
        } = this.props;

        if(!logged.status) {
            return <Login />;
        } else {
            return (
                <>
                    <StyledMain>
                        <div className="row">
                            <div className="menu col-sm-2">
                                <Menu
                                    getPlaylists={this.props.getPlaylists}
                                    logout={this.props.logout}
                                    setView={this.props.setView}
                                    playlists={this.props.playlists}
                                    uri={uri}
                                />
                            </div>
                            <div className="browser col-sm-10">
                                {/* <Search
                                    onSearchChange={this.onSearchChange}
                                /> */}
                                <View
                                    uri={uri}
                                    tracks={tracks}
                                />
                            </div>
                            <div className="controls-wrapper">
                                <Controls />
                            </div>
                        </div>
                        {
                            process.env.NODE_ENV === 'development' ?
                            (
                                <div className="debug">
                                    <p>{JSON.stringify(this.props.uri)}</p>
                                    <p>{JSON.stringify(this.props.device_id)}</p>
                                </div>
                            ) :
                            ''
                        }
                    </StyledMain>
                </>
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
        device_id: state.device_id
    };
};

export default connect(mapStateToProps, {
    logout,
    getUser,
    getPlaylists,
    setView,
    setDeviceId,
    getPlayer
})(Main);
