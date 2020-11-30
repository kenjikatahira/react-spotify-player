import React, { useState, useEffect } from 'react';
import styled from 'styled-components'

const StyledPlaying = styled.div`
    position:relative;
    text-align: center;
    font-size: 13px;
    height: 8vh;

    .image {
        float: left;
        img {
            top: 0;
            left: 0;
            height:8vh;
        }
    }

    .info {
        position: relative;
        left: 8px;
        display: flex;
        align-self: center;
        justify-content: center;
        flex-direction: column;
        height: 8vh;
        white-space: nowrap;
        text-align: left;
    }
`

const Playing = ({current_state : { current_track }}) => {
    const image = ((((current_track || {}).album || {}).images || [])[0] || {}).url;
    const track = (current_track || {}).name;
    const artist = (((current_track || {}).artists || [])[0] || {}).name;
    return (
        <StyledPlaying>
            <div className="image col-sm-4">
                <img src={image} />
            </div>
            <div className="info col-sm-8">
                <div className="track"><b>{track}</b></div>
                <div className="artist">{artist}</div>
            </div>
        </StyledPlaying>
    )
}

export default Playing;

