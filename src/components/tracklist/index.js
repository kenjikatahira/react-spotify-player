import React from 'react';
import { play } from '../../player';
import styled from 'styled-components'

const StyledList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 10px;

    .track {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding : 14px;
        border-top: 1px solid rgba(133,133,133,.3);
        width: 90%;
        margin: 0 auto;
        &:last-child {
            border-bottom: 1px solid rgba(133,133,133,.3);
        }
        .name span { padding-left: 15px; display: inline-block; margin-bottom:0; }
    }
`
const Tracklist = ({list}) => {
    const { tracks } = list;
    const setTrackDuration = (duration) => {
        const minutes = Math.floor(duration / 60000);
        const seconds = ((duration % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }
    const renderList = (item) => {
        return (
            <li className="track" key={item.id} onClick={() => {play({...item})}}>
                <div className="name">
                    <i className="fas fa-play" ></i>
                    <span>{item.name}</span>
                </div>
                <div className="duration">
                    <span>{setTrackDuration(item.duration_ms)}</span>
                </div>
            </li>
        )
    }
    if(tracks) {
        return(
            <>
                <StyledList>
                    {tracks.map(renderList)}
                </StyledList>
            </>
        )
    } else {
        return(
            <>
                loading
            </>
        )
    }
}

export default Tracklist;
