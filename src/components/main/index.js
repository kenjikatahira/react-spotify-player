import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
    logout,
    getUser,
    getCurrentTrack,
    getPlaylists
} from '../../actions';

import { init } from '../../player';

import SearchTrack from '../searchTrack';
import TrackList from '../tracklist';
import SideMenu from '../sidemenu';
import Controls from '../controls';
import View from '../view';
import Login from '../login';


const StyledMain = styled.main`
    color: #ffffff;
    overflow: hidden;
    font-family: 'Roboto', sans-serif;

    header {
        width: 100%;
        height: 5vh;
        background-color: #1F1A3C;
    }
    .sidemenu {
        width: 240px;
        height: 92vh;
        background-color: #1F1A3C;
        padding: 0;
        margin: 0;
    }

    .content {
        width: 100%;
        height: 92vh;
        background-color: #18142F;
        overflow: auto;
        padding: 0;

    }
`
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
        const { currentTrack } = this.props;
        init({ currentTrack })
        this.initiated = true;
    }
    async componentDidMount() {
        window.onSpotifyWebPlaybackSDKReady = () => {
            console.log('onSpotifyWebPlaybackSDKReady');
            this.props.getCurrentTrack();
            this.props.getPlaylists();
        };
    }
    render() {
        const { logged,current,playlists } = this.props;
        (current.track && !this.initiated) && this.run();
        if(!logged.status) {
            return(<Login />)
        } else {
            return (
                <>
                    <StyledMain>
                        <main>
                            <div className="row">
                                <div ClassName="col-sm-3">
                                    <SideMenu playlists={playlists} />
                                </div>
                                {/* <header>
                                    <button className="btn btn-outline-secondary" onClick={() => this.props.logout()}>logout</button>
                                </header> */}
                                <div className="content col-sm-9">
                                    <View current={current}></View>
                                </div>
                            </div>
                            <Controls current={current}></Controls>
                        </main>
                    </StyledMain>
                </>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.user,
        logged : state.logged,
        playlists : state.playlists,
        current : state.current,
        context : state.context
    };
}

export default connect(mapStateToProps, { logout,getUser,getCurrentTrack,getPlaylists })(Main);
