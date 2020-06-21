import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import {
    logout,
    getUser,
    getPlaylists,
    setView,
    setDeviceId
} from "../../actions";

import Player from "./../../api/Player";

import View from "../view";
import Login from "../login";
import Playlists from "../playlists";

const StyledMain = styled.main`
    overflow: hidden;
    font-family: "Gotham", sans-serif;
    background: #181818;
    padding: 0;
    color: #fff;
    overflow: none;

    .menu, .browser {
        height: 100vh;
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
            Player.init({ currentTrack, setDeviceId });
        },1000);
        this.initiated = true;
    }
    UNSAFE_componentWillUpdate() {
        !this.initiated  && this.props.logged.status === true && this.run();
    }
    async componentDidMount() {
        window.onSpotifyWebPlaybackSDKReady = () => {
            this.props.setView();
        };
    }
    render() {
        const { logged, view, tracks } = this.props;
        if (!logged.status && this.props.device_id) {
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
        view: state.view,
        device_id: state.device_id
    };
};

export default connect(mapStateToProps, {
    logout,
    getUser,
    getPlaylists,
    setView,
    setDeviceId
})(Main);
