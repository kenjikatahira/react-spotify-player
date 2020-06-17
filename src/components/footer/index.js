import React from 'react';

import { previous,next,play,pause } from '../../player';

const Footer = (props) => {
    const { status,currentTrack } = props;
    return(
        <>
            <div className="footer">
                <div className="wrapper">
                    <div className="controls">
                        <button className="btn btn-outline-secondary" onClick={() => previous()}><i className="fas fa-backward"></i></button>
                        <button className="btn btn-outline-secondary" onClick={() => play(status.current_track || currentTrack.track)}><i className="fas fa-play"></i></button>
                        <button className="btn btn-outline-secondary" onClick={() => pause()}><i className="fas fa-pause"></i></button>
                        <button className="btn btn-outline-secondary" onClick={() => next()}><i className="fas fa-forward"></i></button>
                        {(status.current_track || {}).name}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;
