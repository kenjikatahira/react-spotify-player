import React, { useState } from 'react';
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

    const [barTracking,setBarTracking] = useState(0);

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

    const onChangePosition = (position) => setBarTracking(Math.floor(100*position/(currentTrack || {}).duration_ms))

    const setPosition = (ev) => {
        // console.log(ev.pageX)
        // console.log(ev.target.offsetLeft)
        // console.log(ev.target.offsetTop)
    }

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
                <div className="playback-bar" onClick={setPosition}>
                    <span className="timer-label"><TimerContainer currentTrack={currentTrack || {}} onChangePosition={onChangePosition} /></span>
                    <div className="playback-progress-bar">
                        <div className="progress-bar-inner" style={{width: barTracking + '%'}}></div>
                    </div>
                    <span className="timer-label">
                    {
                        (currentTrack || {}).duration_ms && <Timer fixed={(currentTrack || {}).duration_ms} />
                    }
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

