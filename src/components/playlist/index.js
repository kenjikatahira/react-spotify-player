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
        &:last-child {
            border-bottom: 1px solid rgba(133,133,133,.3);
        }
        .info p { padding-left: 15px; display: inline-block; margin-bottom:0; }
    }
`
const Playlist = ({album}) => {
    const { id : album_id} = album;
    const { artists } = album;
    const renderList = (item) => {
        const {id,name,duration_ms} = item;
        return (
                <li className="track" key={id} onClick={() => {play({album_id,...item})}}>
                    <div className="info">
                        <i className="fas fa-play" ></i>
                        <p>{name}</p>
                    </div>
                    <div className="info">
                        <p>{msToMinutes(duration_ms)}</p>
                    </div>
                </li>
            )
    }
    const msToMinutes = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }
    if(((album || {}).tracks || {}).items) {
        return (
            <>
                <StyledList>
                    <h1 className="display-4">{artists[0].name}</h1>
                    <h2>{album.name}</h2>
                    {((album || {}).tracks || {}).items.map(renderList)}
                </StyledList>
            </>
        )
    } else {
        return (
            <>
                <p>loading</p>
            </>
        )
    }
}

export default Playlist;
