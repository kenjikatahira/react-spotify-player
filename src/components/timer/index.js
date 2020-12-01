import React from 'react';
import './style.scss';

const Timer = ({count,fixed}) => {
    return (
        <div className="timer">
            {fixed ? fixed : count}
        </div>
    )
}

export default Timer;

