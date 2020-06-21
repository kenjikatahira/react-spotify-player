import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import {
    logout,
    getUser,
    getPlaylists,
    setView
} from "../../actions";

import { init } from "../../spotify";

import View from "../view";
import Login from "../login";
import Playlists from "../playlists";

const StyledMain = styled.main`
    overflow: hidden;
    font-family: "Gotham", sans-serif;
    background: #181818;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0;
    color: #fff;

    .menu, .browser {
        height: 92vh;
    }

    .browser {
        overflow: auto;
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
        setTimeout(() => {
            init({ currentTrack, setDeviceId });
        },100);
        this.initiated = true;
    }
    async componentDidMount() {
        window.onSpotifyWebPlaybackSDKReady = () => {
            this.props.setView();
            this.run();
        };
    }
    render() {
        const { logged,  device_id, view, tracks } = this.props;
        if (!logged.status) {
            return <Login />;
        } else {
            return (
                <>
                    <StyledMain>
                        <div className="row">
                            <div className="menu col-sm-3">
                                <Playlists></Playlists>
                            </div>
                            <div className="browser col-sm-9">
                                <View
                                    view={view}
                                    tracks={tracks}
                                ></View>
                            </div>
                        </div>
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
        view: state.view
    };
};

export default connect(mapStateToProps, {
    logout,
    getUser,
    getPlaylists,
    setView
})(Main);
