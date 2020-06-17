import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
    logout,
    getUser,
    getCurrentTrack,
    getStatus
} from '../../actions';

import { init } from '../../player';

import SearchTrack from '../searchTrack';
import Playlist from '../playlist';
import SideMenu from '../sidemenu';
import Footer from '../footer';
import Login from '../login';


const StyledMain = styled.main`
    color: #ffffff;
    overflow: hidden;

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
    }

    .footer .controls {
        background-color: #282148;
        height: 8vh;
    }
`

/**
 * Aplication Initiated Flag
 * @type {Boolean}
 */
let initiated = false;

class Main extends React.Component {
    /**
     * Initial configuration
     * @function run
     * @return {Void}
     */
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
        const { logged,currentTrack,status } = this.props;
        (currentTrack.track && !initiated) && this.run();

        if(!logged.status) {
            return(<Login />)
        } else {
            return (
                <>
                    <StyledMain>
                        <main>
                            <div className="row">
                                <SideMenu />
                                <div className="content col-sm-10">
                                    {/* <SearchTrack /> */}
                                    <Playlist album={(currentTrack.album || {})} />
                                </div>
                            </div>
                            <Footer status={status} currentTrack={currentTrack}></Footer>
                            <button className="btn btn-outline-secondary" onClick={() => this.props.logout()}>logout</button>
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
