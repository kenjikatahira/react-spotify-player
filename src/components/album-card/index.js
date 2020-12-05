import React from 'react';
import Styled from 'styled-components';

const AlbumCard = ({album, player, setView}) => {
    const {
        uri,
        id,
        images,
        name,
        artists,
        album : albumData
    } = album;

    const albumUri = (albumData || {}).uri;

    const onAlbumClick = (ev) => {
        ev.stopPropagation();
        setView({uri : albumUri});
    }

    return (
        <div className="album col-sm-3" onClick={onAlbumClick} key={id}>
            <div className="image" style={
                { backgroundImage: `url(${images.length && images[0].url})`, backgroundSize :'cover', backgroundPosition:'center center' }
            }></div>
            <div className="card-body" onClick={(ev) => { ev.stopPropagation(); player.play({ uri : uri }) }}>
                <p>PLAY</p>
                <p className="card-title">{name}</p>
                <small className="card-text" onClick={(ev) => { ev.stopPropagation(); setView({uri : artists[0].uri}) }}>{artists[0].name}</small>
            </div>
        </div>
    )
}

export default AlbumCard;
