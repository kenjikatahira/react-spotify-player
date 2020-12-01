import React from 'react';

import './style.scss';

const Playing = ({current_state : { current_track }}) => {
    const image = ((((current_track || {}).album || {}).images || [])[0] || {}).url;
    const track = (current_track || {}).name;
    const artist = (((current_track || {}).artists || [])[0] || {}).name;
    return (
        <div className="playing">
            <div className="image col-sm-4">
                <img src={image} alt={image} />
            </div>
            <div className="info col-sm-8">
                <div className="track"><b>{track}</b></div>
                <div className="artist">{artist}</div>
            </div>
        </div>
    )
}

export default Playing;

