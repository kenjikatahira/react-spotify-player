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
    let { uri,items,type,json } = list;
    if(type === 'track') {
        uri = json.album.uri;
    }

    const renderList = (item) => {
        const {id,name,duration_ms} = item.track || item;
        return (
            <li className="track" key={id} onClick={() => {play({uri,...item})}}>
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
    // const {context} = list;
    // const album_id = (album || {}).id;


    // if(((album || {}).tracks || {}).items) {
    //     const { artists } = album;
    //     return (
    //         <>
    //             <h1 className="display-4">{artists[0].name}</h1>
    //             <h2>{album.name}</h2>
    //             <StyledList>
    //                 {(context || {}).items.map(renderList)}
    //             </StyledList>
    //         </>
    //     )
    // } else {
    //     return (
    //         <>
    //             <p>loading</p>
    //         </>
    //     )
    // }
}

export default Tracklist;
