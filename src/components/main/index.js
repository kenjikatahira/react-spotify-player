import React from 'react';
import { connect } from 'react-redux';

import { init,previous,next,play,pause } from '../../player';
import { logout,getUser,getCurrentTrack,getStatus } from '../../actions';

import Login from '../login';
import SearchTrack from '../searchTrack';
import Playlist from '../playlist';
import styled from 'styled-components'

const StyledMain = styled.main`
    color: #ffffff;
    overflow: hidden;

    .playlists {
        width: 240px;
        height: 92vh;
        background-color: #1F1A3C;
    }

    .content {
        width: 100%;
        height: 92vh;
        background-color: #18142F;
    }

    .footer .controls {
        background-color: #282148;
        height: 8vh;
    }

`

let initiated = false;

class Main extends React.Component {
    run() {
        init({
            currentTrack : this.props.currentTrack,
            getStatus : this.props.getStatus
        });
        initiated = true;
    }
    async componentDidMount() {
        window.onSpotifyWebPlaybackSDKReady = () => {
            console.log('onSpotifyWebPlaybackSDKReady');
            this.props.getCurrentTrack();
        };
    }
    render() {
        (this.props.currentTrack.track && !initiated) && this.run();

        if(!(this.props.logged || {}).status) {
            return(<Login />)
        } else {
            console.log('status changed',this.props.status)
            return (
                <>
                    <StyledMain>
                        <main>
                            <div className="row">
                                <aside className="playlists col-sm-2">

                                </aside>
                                <div className="content col-sm-10">
                                    {/* <SearchTrack /> */}
                                    <Playlist album={(this.props.currentTrack.album || {})} />
                                </div>
                            </div>
                            <div className="footer">
                                <div className="wrapper">
                                    <div className="controls">
                                        <button className="btn btn-outline-secondary" onClick={() => previous()}><i className="fas fa-backward"></i></button>
                                        <button className="btn btn-outline-secondary" onClick={() => play(this.props.status.current_track || this.props.currentTrack.track)}><i className="fas fa-play"></i></button>
                                        <button className="btn btn-outline-secondary" onClick={() => pause()}><i className="fas fa-pause"></i></button>
                                        <button className="btn btn-outline-secondary" onClick={() => next()}><i className="fas fa-forward"></i></button>
                                        <button className="btn btn-outline-secondary" onClick={() => this.props.logout()}>logout</button>
                                        {(this.props.status.current_track || {}).name}
                                    </div>
                                </div>
                            </div>
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
        currentTrack : state.currentTrack,
        logged : state.logged,
        status : state.status
    };
}

export default connect(mapStateToProps, { logout,getUser,getCurrentTrack,getStatus })(Main);
