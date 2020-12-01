import React from 'react';
import './style.scss';
import { connect } from "react-redux";
import { setCurrentState } from './../../actions';

import Playing from './../playing';
import TimerContainer from '../timerContainer';

class Controls extends React.Component {

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
        player.addListener('ready', ({device_id}) => {
            console.log('Ready - Device ID', device_id);
            player.setDeviceId(device_id);
        });
        // update status - action
        player.addListener('player_state_changed', this.onChange.bind(this));
        // player connected
        player.connect();
        this.connected = true;
    }

    togglePlayButton() {
        const { paused } = this.props.current_state;
        if(paused === undefined || paused) {
            return (
                <button
                    className="btn btn-outline-secondary"
                    onClick={() => {
                        this.props.player.resume({device_id : this.props.device_id || ''})
                    }}
                >
                    <i className="fas fa-play"></i>
                </button>
            )
        } else {
            return (
                <button className="btn btn-outline-secondary" onClick={this.props.player.pause}>
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

        // verify if player device_id is ready to take commands
        if(this.props.device_id) {
            return(
                <>
                    <div className="controls">
                        <div className="playing-wrapper col-sm-2">
                            <Playing current_state={current_state} />
                        </div>
                        <div className="col-sm-10">
                            <TimerContainer current_state={current_state} />
                            <button className="btn btn-outline-secondary" onClick={() => {player.previous(this.teste)}}>
                                <i className="fas fa-backward"></i>
                            </button>
                            {this.togglePlayButton()}
                            <button className="btn btn-outline-secondary" onClick={player.next}>
                                <i className="fas fa-forward"></i>
                            </button>
                        </div>
                    </div>
                </>
            )
        } else {
            return(
                <div>Loading...</div>
            )
        }
    }
}
const mapStateToProps = (state) => {
    return {
        device_id: state.device_id,
        player : state.player,
        current_state : state.current_state
    };
};

export default connect(mapStateToProps, { setCurrentState })(Controls);

