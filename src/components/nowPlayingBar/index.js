import React from 'react';
import './style.scss';
import { connect } from "react-redux";
import { setCurrentState } from '../../actions';

import Playing from '../nowPlayingInfo';
import TimerContainer from '../timerContainer';
import Timer from '../timer';

import { set_device_id } from './../../utils';

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
            <>
                <div className="now-playing">
                    <div className="playing-wrapper">
                        <Playing current_state={current_state} />
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
                </div>
            </>
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

