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
import Controls from "../controls";

const StyledMain = styled.main`
    overflow: hidden;
    font-family: "Lato";
    background: rgba(28,28,28);
    padding: 0;
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
        height: 100vh;
        overflow-x: hidden;
        overflow-y: auto;
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
        setTimeout(() => {
            Player.init({ currentTrack, setDeviceId });
        },1000);
        this.initiated = true;
    }
    UNSAFE_componentWillUpdate() {
        !this.initiated  && this.props.logged.status === true && this.run();
    }
    componentDidMount() {
        window.onSpotifyWebPlaybackSDKReady = () => {
            const lastPage = window.localStorage.getItem('last_uri');
            this.props.setView(lastPage ? { uri : lastPage} : '');
        };
    }
    render() {
        const { logged, view, tracks } = this.props;

        if(!logged.status) {
            return <Login />;
        } else {
            return (
                <>
                    <StyledMain>
                        <div className="row">
                            <div className="menu col-sm-2">
                                <Playlists></Playlists>
                                <Controls></Controls>
                            </div>
                            <div className="browser col-sm-10">
                                <div class="search">
                                    <input type="text"></input>
                                </div>
                                <View
                                    view={view}
                                    tracks={tracks}
                                ></View>
                            </div>
                        </div>
                        {
                        process.env.NODE_ENV === 'development' ?
                        (
                            <div className="debug">
                                <p>{JSON.stringify(process.env)}</p>
                                <p>{JSON.stringify(this.props.device_id)}</p>
                                <p>{JSON.stringify(this.props.playlists.length)}</p>
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
