import React from "react";
import PropTypes from 'prop-types';
import Styled from 'styled-components';

const StyledGrid = Styled.div`
    width:90%;
    margin:0 auto;

    h2 {
        margin: 26px 15px;
        border-bottom: 1px solid #ffffff1a;
        padding-bottom: 17px;
    }

    .albums-row {
        display: flex;
        flex-direction: row;
        flex-flow: row wrap;
        width: 100%;
        padding: 10px 0;
        margin-bottom: 25px;
        padding: 10px;
        overflow: auto;
        max-width: 100%;
        .album {
            position: relative;
            padding-right: 10px;
            padding-left: 10px;
            cursor: pointer;
            .image {
                width: 100%;
                padding-bottom: 100%;
            }
            .card-title {
                font-size: 14px;
            }
            .card-body {
                padding: 10px 0;
            }
            .card-body .card-text {
                display : block;
                font-weight: bold;
                font-size:13px;
                padding: 0;
                margin: 0;
            }
            .overlay {
                position: absolute;
                bottom:0;
                left:0;
                right:0;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                opacity: 0;
                margin-bottom:50%;
            }
            &:hover .overlay {
                opacity: 1;
            }
        }
    }
`

const Grid = ({grid, player, setUri}) => {
    const renderAlbums = ({images,uri,id,name,artists}) => {
        return (
            <div className="album col-xs-12 col-sm-6 col-md-4 col-lg-3" key={id}>
                <div className="image"
                    onClick={() => {
                        if(uri.indexOf('spotify:track') !== -1) {
                            player.play({uri})
                        } else {
                            setUri(uri)
                        }
                     }}
                    style={
                        { backgroundImage: `url(${(images || {}).length && images[0].url})`, backgroundSize :'cover', backgroundPosition:'center center' }
                    }
                >
                </div>
                {/* <div className="overlay">
                    <button
                        className="btn btn-outline-secondary control-button play"
                        onClick={() => {
                            console.log(uri)
                        }}
                    >
                        <FontAwesomeIcon icon="play" />
                    </button>
                </div> */}
                <div className="card-body">
                    <p className="card-text">{ artists && artists[0].name}</p>
                    <p className="card-title">{name}</p>
                </div>
            </div>
        )
    }

    const renderRow = ({message,type,items}) => {
        if(items) {
            return (
                <React.Fragment key={message}>
                    <h2> {message} </h2>
                    <div className="albums-row" key={type}>
                        {items.map(renderAlbums)}
                    </div>
                </React.Fragment>
            )
        }
    }

    return (
        <StyledGrid className="grid">
            {Object.values((grid || {})).map(renderRow)}
        </StyledGrid>
    );
}

Grid.propTypes = {
    grid : PropTypes.object,
    player : PropTypes.object,
    setUri : PropTypes.func
}

export default Grid;
