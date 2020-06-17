import React from 'react';
import { previous,next,play,pause } from '../../player';
import styled from 'styled-components'

const StyledFooter = styled.div`
    background-color: #282148;
    height: 8vh;
    .controls {
        border:1px solid #fff;
        button svg { color: #fff; }
    }
`

const Footer = (props) => {
    const { status,currentTrack } = props;
    return(
        <>
            <StyledFooter>
                <div className="row">
                    <div className="controls col-sm-8">
                        <button className="btn btn-outline-secondary" onClick={previous}>
                            <i className="fas fa-backward"></i>
                        </button>
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => play(status.current_track || currentTrack.track)}
                        >
                            <i className="fas fa-play"></i>
                        </button>
                        <button className="btn btn-outline-secondary" onClick={pause}>
                            <i className="fas fa-pause"></i>
                        </button>
                        <button className="btn btn-outline-secondary" onClick={next}>
                            <i className="fas fa-forward"></i>
                        </button>
                        {(status.current_track || {}).name || ((currentTrack.track || {}).item || {}).name}
                    </div>
                </div>
            </StyledFooter>
        </>
    )
}

export default Footer;
