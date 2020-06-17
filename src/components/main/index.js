import React from 'react';
import { connect } from 'react-redux';
import { init,previous,next,play,pause } from '../../player';
import { logout,getUser,getCurrentTrack,getStatus } from '../../actions';

import Login from '../login';
import SearchTrack from '../searchTrack';
import Playlist from '../playlist';
import styled from 'styled-components'

const StyledList = styled.main`
    background: red !important;
`



let initiated = false;

class Main extends React.Component {
    async componentDidMount() {
        window.onSpotifyWebPlaybackSDKReady = () => {
            console.log('onSpotifyWebPlaybackSDKReady');
            this.props.getCurrentTrack();
        };
    }
    render() {
        if(this.props.currentTrack.track && !initiated) {
            init({
                currentTrack : this.props.currentTrack,
                getStatus : this.props.getStatus
            });
            initiated = true;
        }
        if((this.props.logged || {}).status) {
            console.log('props.status',this.props.status)
            return (
                <>
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
                </>
            )
        } else {
            return(<Login />)
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
