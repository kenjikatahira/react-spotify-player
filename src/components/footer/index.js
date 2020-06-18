import React from 'react';
import { previous,next,play,pause } from '../../player';
import styled from 'styled-components'

const StyledFooter = styled.div`
    background-color: #282148;
    height: 8vh;
`

const Footer = (props) => {
    const { currentTrack } = props;
    console.log(`footer`,currentTrack)
    return(
        <>
            <StyledFooter>
                <div className="row">
                    <div className="controls col-sm-12">
                        <button className="btn btn-outline-secondary" onClick={previous}>
                            <i className="fas fa-backward"></i>
                        </button>
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => play(currentTrack.track)}
                        >
                            <i className="fas fa-play"></i>
                        </button>
                        <button className="btn btn-outline-secondary" onClick={pause}>
                            <i className="fas fa-pause"></i>
                        </button>
                        <button className="btn btn-outline-secondary" onClick={next}>
                            <i className="fas fa-forward"></i>
                        </button>
                        {((currentTrack.track || {}).item || {}).name || ((currentTrack.track || {}) || {}).name}
                    </div>
                </div>
            </StyledFooter>
        </>
    )
}

export default Footer;
