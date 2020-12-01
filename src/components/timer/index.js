import React from 'react';

import {formatTrackDuration} from './../../utils';

import './style.scss';

const Timer = ({count,fixed}) => {
    return (
        <div className="timer">
            {formatTrackDuration(fixed ? fixed : count)}
        </div>
    )
}

export default Timer;

