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
    const { current } = props;
    return(
        <>
            <StyledFooter>
                <div className="controls">
                    <button className="btn btn-outline-secondary" onClick={previous}>
                        <i className="fas fa-backward"></i>
                    </button>
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => play(current.uris)}
                    >
                        <i className="fas fa-play"></i>
                    </button>
                    <button className="btn btn-outline-secondary" onClick={pause}>
                        <i className="fas fa-pause"></i>
                    </button>
                    <button className="btn btn-outline-secondary" onClick={next}>
                        <i className="fas fa-forward"></i>
                    </button>
                    {current.name}
                </div>
            </StyledFooter>
        </>
    )
}

export default Footer;
