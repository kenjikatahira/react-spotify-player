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
    let { playlist_uri,items,type,json } = list;
    if(type === 'track') {
        playlist_uri = json.album.uri;
    }

    const renderList = (item) => {
        const {id,name,duration_ms, uri : track_uri} = item.track || item;
        return (
            <li className="track" key={id} onClick={() => {play({playlist_uri,track_uri,...item})}}>
                <div className="name">
                    <i className="fas fa-play" ></i>
                    <span>{name}</span>
                </div>
                <div className="duration">
                    <span>{msToMinutes(duration_ms)}</span>
                </div>
            </li>
        )
    }
    const msToMinutes = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }
    if(items) {
        return(
            <>
                <StyledList>
                    {items.map(renderList)}
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
