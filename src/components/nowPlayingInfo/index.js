import React from 'react';

import './style.scss';

const NowPlayingInfo = ({current_state : { current_track }}) => {
    const image = ((((current_track || {}).album || {}).images || [])[0] || {}).url;
    const track = (current_track || {}).name;
    const artist = (((current_track || {}).artists || [])[0] || {}).name;
    return (
        <div className="now-playing-info">
            <div className="image">
                <img src={image} alt={image} />
            </div>
            <div className="info">
                <div className="track"><b>{track}</b></div>
                <div className="playing-artist">{artist}</div>
            </div>
        </div>
    )
}

export default NowPlayingInfo;

