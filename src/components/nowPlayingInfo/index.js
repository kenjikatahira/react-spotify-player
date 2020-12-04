import React from 'react';
import Styled from 'styled-components';

const StyledNowPlayingInfo = Styled.div`
    display: grid;
    grid-template-columns: 33%;
    grid-template-rows: auto;
    grid-template-areas:
      "sidebar main main";

    text-align: center;
    font-size: 13px;
    height:8vh;

    .image {
        grid-area: sidebar;
        align-self: center;
        img {
            height:8vh;
            padding: 6px;
        }
    }

    .info {
        grid-area: main;
        align-self: center;
        justify-self: start;
        white-space: nowrap;
        .playing-artist {
            text-align: left;
            color: #999;
        }
    }
`

const NowPlayingInfo = (current_track) => {
    const image = ((((current_track || {}).album || {}).images || [])[0] || {}).url;
    const track = (current_track || {}).name;
    const artist = (((current_track || {}).artists || [])[0] || {}).name;
    return (
        <StyledNowPlayingInfo className="now-playing-info">
            <div className="image">
                <img src={image} alt={image} />
            </div>
            <div className="info">
                <div className="track"><b>{track}</b></div>
                <div className="playing-artist">{artist}</div>
            </div>
        </StyledNowPlayingInfo>
    )
}

export default NowPlayingInfo;

