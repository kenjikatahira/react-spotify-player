import React from 'react';
import styled from 'styled-components'
import { connect } from "react-redux";
import { setCurrentState } from './../../actions';

const StyledControls = styled.div`
    .controls {
        text-align: center;
        button svg { color: #fff; }
        position: fixed;
        bottom: 0;
        z-index:10;
        background:#000;
    }
`

class Controls extends React.Component {
    /**
     * Configure spotify player listeners
     * @function configurePlayer
     * @param player Spotify Player Instance
     * @return {Void}
     */
    configurePlayer(player) {
        // player -> instancia do spotify player
        player.addListener('ready', ({device_id}) => {
            player.setDeviceId(device_id);
            console.log('Ready - Device ID', device_id);
        });

        player.on('authentication_error', ({ message }) => {
            console.error('Failed to authenticate', message);
        });

        player.on('initialization_error', ({ message }) => {
            console.error('Failed to initialize', message);
        });

        // update status - action
        player.addListener('player_state_changed', this.onChangeState.bind(this));

        player.connect();
    }
    /**
     * Player state changed callback
     * @function onChangeState
     * @param state Changed State Data
     * @return {Void}
     */
    onChangeState(state) {
        // action to set current state
        this.props.setCurrentState(state);
    }
    render() {
        const {player} = this.props;
        if(player && player.addListener) {
            this.configurePlayer(player);
        }
        if(this.props.device_id) {
            return(
                <>
                    <StyledControls>
                        <div className="controls">
                            <div>
                                00:00
                            </div>
                            <button className="btn btn-outline-secondary" onClick={() => {player.previous(this.teste)}}>
                                <i className="fas fa-backward"></i>
                            </button>
                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => {
                                    if((this.props.view || {}).uri) {
                                        player.play({
                                            uri : this.props.view.uri,
                                            tracks : this.props.view.tracks,
                                            device_id : this.props.view.device_id
                                        })
                                    } else {
                                        player.resume();
                                    }
                                }}
                            >
                                <i className="fas fa-play"></i>
                            </button>
                            <button className="btn btn-outline-secondary" onClick={player.pause}>
                                <i className="fas fa-pause" onClick={player.pause}></i>
                            </button>
                            <button className="btn btn-outline-secondary" onClick={player.next}>
                                <i className="fas fa-forward"></i>
                            </button>
                        </div>
                    </StyledControls>
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
        view: state.view,
        device_id: state.device_id,
        player : state.player
    };
};

export default connect(mapStateToProps, { setCurrentState })(Controls);

