import React from 'react';
import { connect } from "react-redux";
import Styled from 'styled-components';

import { setCurrentState } from '../../actions';
import { set_device_id } from './../../utils';

import NowPlayingInfo from '../nowPlayingInfo';
import TimerContainer from '../timer/timerContainer';
import Timer from '../timer';

const StyledPlayingBar = Styled.div`
    background-color: #282828;
    border-top: 1px solid #000;
    display: grid;
    grid-template-columns: 20%;
    grid-template-rows: auto;
    grid-template-areas:
      "sidebar main main ."
      "footer footer footer footer";

    .playing-wrapper {
        grid-area: sidebar;
    }
    .inner-now-playing {
        grid-area: main;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .controls-buttons {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-self: center;
            width: 150px;

            .control-button {
                color: #b3b3b3;
                position: relative;
                width: 32px;
                min-width: 32px;
                height: 32px;

                &.play {
                    border: 1px solid #b3b3b3;
                    border-radius: 32px;
                }

                svg {
                    position: relative;
                    top: -3px;
                    left: -3px;
                    height: 15px;
                    width: 15px;
                }
            }
        }

        .playback-bar {
            display: flex;
            flex-direction: row;
            justify-content: center;
            width: 45%;
            max-width: 722px;
            align-self: center;
            align-items: center;

            .playback-progress-bar {
                width: 100%;
                margin: 0 10px;

                .progress-bar-inner {
                    background-color: #b3b3b3;
                    border-radius: 2px;
                    height: 4px;
                    width: 100%;
                }
            }
        }
    }
`

class NowPlaying extends React.Component {
    componentDidUpdate() {
        if(
            this.props.player &&
            this.props.player.addListener &&
            !this.connected
        ) this.configurePlayer(this.props.player);
    }

    onChange(state) {
        this.props.setCurrentState(state);
    }

    /**
     * Configure spotify player listeners
     * @function configurePlayer
     * @param player Spotify Player Instance
     * @return {Void}
     */
    configurePlayer(player) {
        if(!player) return;
        // player -> instancia do spotify player
        player.addListener('ready', ({device_id}) => set_device_id(device_id));
        // update status - action
        player.addListener('player_state_changed', this.onChange.bind(this));
        // player connected
        player.connect();
        // connected
        this.connected = true;
    }

    togglePlayButton() {
        const { paused } = this.props.current_state;
        if(paused === undefined || paused) {
            return (
                <button
                    className="btn btn-outline-secondary control-button play"
                    onClick={() => {
                        this.props.player.resume()
                    }}
                >
                    <i className="fas fa-play"></i>
                </button>
            )
        } else {
            return (
                <button className="btn btn-outline-secondary control-button play" onClick={this.props.player.pause}>
                    <i className="fas fa-pause" onClick={this.props.player.pause}></i>
                </button>
            )
        }
    }

    render() {
        const {
            player,
            current_state
        } = this.props;
        const { current_track } = current_state;
        return(
            <StyledPlayingBar className="now-playing">
                <div className="playing-wrapper">
                    <NowPlayingInfo current_track={current_track} />
                </div>
                <div className="inner-now-playing">
                    <div className="controls-buttons">
                        <button className="btn control-button" onClick={() => {player.previous(this.teste)}}>
                            <i className="fas fa-backward"></i>
                        </button>
                        {this.togglePlayButton()}
                        <button className="btn control-button" onClick={player.next}>
                            <i className="fas fa-forward"></i>
                        </button>
                    </div>
                    <div className="playback-bar">
                        <TimerContainer current_state={current_state} />
                        <div className="playback-progress-bar">
                            <div className="progress-bar-inner"></div>
                        </div>
                        {
                            (current_track || {}).duration_ms && <Timer fixed={(current_track || {}).duration_ms} />
                        }
                    </div>
                </div>
            </StyledPlayingBar>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        device_id: state.device_id,
        player : state.player,
        current_state : state.current_state
    };
};

export default connect(mapStateToProps, { setCurrentState })(NowPlaying);

