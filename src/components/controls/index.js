import React from 'react';
import styled from 'styled-components'
import { connect } from "react-redux";

const StyledControls = styled.div`
    .controls {
        text-align: center;
        button svg { color: #fff; }
    }
`

class Controls extends React.Component {
    render() {
        if(this.props.device_id) {
            return(
                <>
                    <StyledControls>
                        <div className="controls">
                            <button className="btn btn-outline-secondary" onClick={this.props.player.previous}>
                                <i className="fas fa-backward"></i>
                            </button>
                            {/* <button
                                className="btn btn-outline-secondary"
                                onClick={() => this.props.player.play({
                                    uri : this.props.player.uri,
                                    tracks : this.props.player.tracks,
                                    device_id : this.props.player.device_id
                                })}
                            >
                                <i className="fas fa-play"></i>
                            </button>
                            <button className="btn btn-outline-secondary" onClick={this.props.player.pause}>
                                <i className="fas fa-pause"></i>
                            </button> */}
                            <button className="btn btn-outline-secondary" onClick={this.props.player.next}>
                                <i className="fas fa-forward"></i>
                            </button>
                        </div>
                    </StyledControls>
                </>
            )
        } else {
            return(
                <div>loading</div>
            )
        }
    }
}
const mapStateToProps = (state) => {
    return {
        view: state.view,
        player: state.player,
        device_id: state.device_id,
    };
};

export default connect(mapStateToProps)(Controls);

