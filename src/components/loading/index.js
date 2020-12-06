import React from 'react';
import './style.scss';
import gif from './Rolling-1.2s-184px.gif';

const Loading = () => {
    return (
        <>
            <div className="loading">
                <img src={gif} alt="loading" />
            </div>
        </>
    )
}

export default Loading;
