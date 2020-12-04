import React, { useState, useEffect } from 'react';

import Timer from '.';

const TimerContainer = ({current_state,fixed}) => {
    const {
        paused,
        position,
        current_track
    } = current_state;

    let [state, setState] = useState({
        count : position || 0,
        current_track
    });

    // se trocar a musica, zera a contagem
    if((current_track || {}).id !== (state.current_track || {}).id) {
        setState({
            count: 0,
            current_track : current_track
        });
    }

    const timer = (cb) => {
        const _timer = {
            start : () => setTimeout(() => {
                setState({
                    count : state.count + 1000,
                    current_track
                });
            }, 1000),
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

export default TimerContainer;

