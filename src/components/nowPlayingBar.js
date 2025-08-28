import React, { useState, useRef } from 'react';
import Styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { set_shuffle } from './../api/spotify';

import NowPlayingInfo from './nowPlayingInfo';
import TimerContainer from './timer/timerContainer';
import Timer from './timer';

const StyledPlayingBar = Styled.div`
    background-color: #282828;
    border-top: 1px solid #000;
    display: grid;
    grid-template-columns: 20%;
    grid-template-rows: auto;
    grid-template-areas:
        "sidebar sidebar main main . rightbar"
        "footer footer footer footer footer footer";

    .playing-wrapper {
        grid-area: sidebar;
    }

    .controls-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-self: center;
        width: 150px;
        margin-bottom: 8px;

        &.right {
            grid-area: rightbar;
            width: 100%;
            display:flex;
            justify-content: flex-end;
            align-items: center;
            padding-right:20px;
            margin-bottom: 0;
        }

        .control-button {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #b3b3b3;
            position: relative;
            width: 32px;
            min-width: 32px;
            height: 32px;

            &.play,&.pause {
                display: flex;
                justify-content: center;
                align-items: center;
                border: none;
                border-radius: 32px;
                svg {
                    position: relative;
                }
                &:hover {
                    background: none;
                }
            }
        }
    }

    .inner-now-playing {
        grid-area: main;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .playback-bar {
            display: flex;
            flex-direction: row;
            justify-content: center;
            width: 80%;
            max-width: 722px;
            align-self: center;
            align-items: center;
                position: relative;

            .timer-label {
                position:absolute;
                &:first-child {
                    left: -30px;
                }
                &:last-child {
                    right: -30px;
                }
            }

            .playback-progress-bar {
                width: 100%;
                margin: 0 10px;
                background-color:#1a1a1a;

                .progress-bar-inner {
                    background-color: #b3b3b3;
                    border-radius: 2px;
                    height: 4px;
                    width: 0;
                }
            }
        }
    }
`

const NowPlaying = ({player, currentTrack, setUri}) => {

    const [barTracking, setBarTracking] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const progressBarRef = useRef(null);

    const togglePlayButton =() => {
        if(((currentTrack || {}).disallows || {}).resuming) {
            return (
                <button
                    className="btn btn-outline-secondary control-button pause"
                    onClick={player.pause}
                >
                    <FontAwesomeIcon icon="pause" />
                </button>
            )
        } else {
            return (
                <button
                    className="btn btn-outline-secondary control-button play"
                    onClick={() => {
                        player.resume()
                    }}
                >
                    <FontAwesomeIcon icon="play" />
                </button>
            )
        }
    }

    // const onChangePosition = (position) => setBarTracking(Math.floor(100*position/(currentTrack || {}).duration_ms))

    // Atualiza barra conforme o progresso do timer
    const onChangePosition = (position) => {
        if (!currentTrack?.duration_ms || typeof position !== "number") return;
        if (!isSeeking) {
            const progress = Math.floor(100 * position / currentTrack.duration_ms);
            setBarTracking(Math.min(100, Math.max(0, progress)));
        }
    };

    // Função para calcular e setar a posição ao clicar/arrastar na barra
    const setPosition = (ev) => {
        if (!currentTrack?.duration_ms || !player) return;
        const bar = progressBarRef.current;
        if (!bar) return;
        const rect = bar.getBoundingClientRect();
        const x = ev.type.startsWith('touch') ? ev.touches[0].clientX : ev.clientX;
        let percent = (x - rect.left) / rect.width;
        percent = Math.max(0, Math.min(1, percent));
        const newPosition = Math.floor(currentTrack.duration_ms * percent);
        setBarTracking(percent * 100);
        player.seek(newPosition);
        setIsSeeking(false);
    };

    // Para arrastar o progresso
    const handleSeekStart = (ev) => {
        setIsSeeking(true);
        updateSeek(ev);
        window.addEventListener('mousemove', updateSeek);
        window.addEventListener('mouseup', handleSeekEnd);
        window.addEventListener('touchmove', updateSeek);
        window.addEventListener('touchend', handleSeekEnd);
    };

    const updateSeek = (ev) => {
        if (!currentTrack?.duration_ms || !progressBarRef.current) return;
        const bar = progressBarRef.current;
        const rect = bar.getBoundingClientRect();
        const x = ev.type.startsWith('touch') ? ev.touches[0].clientX : ev.clientX;
        let percent = (x - rect.left) / rect.width;
        percent = Math.max(0, Math.min(1, percent));
        setBarTracking(percent * 100);
    };

    const handleSeekEnd = (ev) => {
        window.removeEventListener('mousemove', updateSeek);
        window.removeEventListener('mouseup', handleSeekEnd);
        window.removeEventListener('touchmove', updateSeek);
        window.removeEventListener('touchend', handleSeekEnd);
        setPosition(ev);
    };

    const shuffle = () => {
        set_shuffle(true)
    }

    if(Object.keys((player || {})).length === 0 && (currentTrack || {})) return (<div className="now-playing"></div>)
    return(
        <StyledPlayingBar className="now-playing">
            <div className="playing-wrapper">
                <NowPlayingInfo currentTrack={currentTrack} setUri={setUri} />
            </div>
            <div className="inner-now-playing">
                <div className="controls-buttons">
                    <button className="btn control-button" onClick={player.prev}>
                        <FontAwesomeIcon icon="backward" />
                    </button>
                    {togglePlayButton()}
                    <button className="btn control-button" onClick={player.next}>
                        <FontAwesomeIcon icon="forward" />
                    </button>
                </div>
                <div className="playback-bar">
                    <span className="timer-label"><TimerContainer currentTrack={currentTrack || {}} onChangePosition={onChangePosition} /></span>
                    <div
                        className="playback-progress-bar"
                        ref={progressBarRef}
                        onClick={setPosition}
                        onMouseDown={handleSeekStart}
                        onTouchStart={handleSeekStart}
                        style={{cursor: 'pointer'}}
                    >
                        <div className="progress-bar-inner" style={{width: barTracking + '%'}}></div>
                    </div>
                    <span className="timer-label">
                        {(currentTrack || {}).duration_ms && <Timer fixed={(currentTrack || {}).duration_ms} />}
                    </span>
                </div>
            </div>
            <div className="controls-buttons right">
                {/* <button className="btn control-button" onClick={player.prev}>
                    <FontAwesomeIcon icon="microphone" />
                </button> */}
                {/* <button className="btn control-button" onClick={() => shuffle()}>
                    <FontAwesomeIcon icon="random" />
                </button> */}
                {/* <button className="btn control-button" onClick={player.next}>
                    <FontAwesomeIcon icon="redo-alt" />
                </button> */}
            </div>
        </StyledPlayingBar>
    )
}

NowPlaying.propTypes = {
    player : PropTypes.object,
    currentTrack : PropTypes.object
}


export default NowPlaying;

