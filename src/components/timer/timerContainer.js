import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Timer from '.';

const TimerContainer = ({currentTrack, fixed, onChangePosition}) => {
    const { paused, position } = currentTrack;
    const [state, setState] = useState({
        count: position || 0,
        currentTrack
    });
    const intervalRef = useRef();

    // Atualiza o progresso localmente
    useEffect(() => {
        if ((currentTrack || {}).id !== (state.currentTrack || {}).id) {
            setState({
                count: position || 0,
                currentTrack: currentTrack
            });
        }
        // eslint-disable-next-line
    }, [currentTrack && currentTrack.id]);

    // Polling para sincronizar com o player real
    useEffect(() => {
        function fetchRealProgress() {
            fetch('https://api.spotify.com/v1/me/player', {
                headers: {
                    'Authorization': `${localStorage.getItem('token_type')} ${localStorage.getItem('access_token')}`
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data && data.progress_ms != null) {
                    setState(s => ({ ...s, count: data.progress_ms }));
                    onChangePosition(data.progress_ms);
                }
            })
            .catch(() => {});
        }
        fetchRealProgress();
        intervalRef.current = setInterval(fetchRealProgress, 2000);
        return () => clearInterval(intervalRef.current);
        // eslint-disable-next-line
    }, [currentTrack && currentTrack.id]);

    // Timer local para suavizar animação
    useEffect(() => {
        if (!paused && position !== undefined) {
            const timeout = setTimeout(() => {
                setState(s => {
                    const next = { ...s, count: s.count + 500 };
                    onChangePosition(next.count);
                    return next;
                });
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [paused, state.count, position, onChangePosition]);

    return (
        <Timer count={state.count} fixed={fixed} />
    );
}

TimerContainer.propTypes = {
    currentTrack : PropTypes.object,
    fixed : PropTypes.string,
    onChangePosition : PropTypes.func
}

export default TimerContainer;

