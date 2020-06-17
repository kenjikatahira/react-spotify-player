import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
    logout,
    getUser,
    getCurrentTrack,
    getStatus,
    getPlaylists,
    getContext
} from '../../actions';

import { init } from '../../player';

import SearchTrack from '../searchTrack';
import TrackList from '../tracklist';
import SideMenu from '../sidemenu';
import Footer from '../footer';
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
    consttructor() {
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
        const { currentTrack, getStatus } = this.props;
        init({ currentTrack, getStatus })
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
        const { logged,currentTrack,status,playlists,context } = this.props;
        (currentTrack.track && !this.initiated) && this.run();
        if(!logged.status) {
            return(<Login />)
        } else {
            return (
                <>
                    <StyledMain>
                        <main>
                            <div className="row">
                                <SideMenu playlists={playlists} />
                                <div className="content col-sm-10">
                                    <header>
                                        <button className="btn btn-outline-secondary" onClick={() => this.props.logout()}>logout</button>
                                    </header>
                                    {/* <SearchTrack /> */}


                                    {/* <View tyype="Tracklist" album={(currentTrack.album || {})}></View> */}


                                    <TrackList list={(context || {})} />
                                </div>
                            </div>
                            <Footer status={status} currentTrack={currentTrack}></Footer>

                        </main>
                    </StyledMain>
                </>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        playlists : state.playlists,
        currentTrack : state.currentTrack,
        logged : state.logged,
        status : state.status,
        context : state.context
    };
}

export default connect(mapStateToProps, { logout,getUser,getCurrentTrack,getStatus,getPlaylists,getContext })(Main);
