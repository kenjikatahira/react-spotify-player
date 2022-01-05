import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Timer from '.';

const TimerContainer = ({currentTrack,fixed,onChangePosition}) => {
    const {
        paused,
        position
    } = currentTrack;

    let [state, setState] = useState({
        count : position || 0,
        currentTrack
    });

    // se trocar a musica, zera a contagem
    if((currentTrack || {}).id !== (state.currentTrack || {}).id) {
        setState({
            count: 0,
            currentTrack : currentTrack
        });
    }

    const timer = (cb) => {
        const _timer = {
            start : () => setTimeout(() => {
                setState({
                    count : state.count + 500,
                    currentTrack
                });
                onChangePosition(state.count);
            }, 500),
            stop : () => {
                if((this || {}).start) {
                    clearTimeout(this.start);
                }
            }
        }
        _timer[cb]();
    }

    useEffect(() => {
        if(!paused && position !== undefined)  {
            timer('start');
        } else if(paused){
            timer('stop');
        }
    });

    return (
        <Timer count={state.count} fixed={fixed} />
    )
}

TimerContainer.propTypes = {
    currentTrack : PropTypes.object,
    fixed : PropTypes.string,
    onChangePosition : PropTypes.func
}

export default TimerContainer;

