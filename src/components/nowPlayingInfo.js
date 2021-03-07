import React from 'react';
import Styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledNowPlayingInfo = Styled.div`
    display: grid;
    grid-template-columns: 18%;
    grid-template-rows: auto;
    grid-template-areas:
      "sidebar main main";

    text-align: center;
    font-size: 11px;
    height:8vh;

    .image {
        align-self: center;
        img {
            height:7vh;
            padding: 6px;
        }
    }

    .info {
        align-self: center;
        justify-self: start;
        text-align: left;
        .playing-artist {
            color: #999;
        }
        .track {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width:100%;
        }
        .playing-artist,.track {
            cursor: pointer;
            margin-bottom: 2px;
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
`

const NowPlayingInfo = ({currentTrack,setUri}) => {
    const image = ((((currentTrack || {}).album || {}).images || [])[0] || {}).url;
    const { name: trackName } = (currentTrack || {});
    const { uri: albumUri } = ((currentTrack || {}).album || {});
    const { name: artistName, uri: artistUri } = (((currentTrack || {}).artists || [])[0] || {});
    return (
        <StyledNowPlayingInfo className="now-playing-info">
            <div className="image">
                <img src={image} alt={image} />
            </div>
            <div className="info">
                <div className="track" onClick={() => setUri(albumUri)}><b>{trackName}</b></div>
                <div className="playing-artist" onClick={() => setUri(artistUri)}>{artistName}</div>
            </div>
        </StyledNowPlayingInfo>
    )
}

NowPlayingInfo.propTypes = {
    currentTrack : PropTypes.object
}

export default NowPlayingInfo;

