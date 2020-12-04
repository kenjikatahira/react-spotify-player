import React from 'react';
import Styled from 'styled-components';
import player from '../../api/player';

const StyledHeader = Styled.div`
        padding: 0 32px 24px;
        margin-bottom: 15px;
        display: flex;
    align-items: center;
        img {
            width: 220px;
        }

        .info {
            align-self: flex-end;
            padding: 0 10px;
            p { margin: 0; }
            .info-type {
                position: relative;
                top: 5px;
                text-transform: uppercase;
                font-weight: 300;
                font-size: 15px;
            }
            .info-name {
                font-size: 82px;
                line-height: 82px;
                padding: 0.08em 0px;
                font-weight: 600;
                margin-bottom: 0;
            }
            .info-description {
                max-width: 500px;
            }
            .info-details {
                padding: 14px 0;
            }
            .info-tracks {
                margin-right: 4px;
            }
            .info-owner {
                &:after {
                    content:"*";
                    padding: 0 6px;
                }
            }
        }

        .info-interactive {
            .play {
                cursor: pointer;
                background: #1DB954;
                border-radius: 15px;
                font-size: 11px;
                letter-spacing: 2px;
                font-weight: bold;
                width: 106px;
                padding: 4px;
                text-align: center;
            }
        }
`


const TracklistHeader = ({props,player,device_id}) => {
    const {
        tracks,
        images,
        name,
        description,
        owner,
        total_duration,
        type
    } = props;

    const getDescription = (description) => {
        return (
            <>
                <div dangerouslySetInnerHTML={{__html: description }} />
            </>
        )
    }

    const tracksDuration = () => {
        return (
            <span className="info-duration">
                {`- ${total_duration} hrs`}
            </span>
        )
    }

    const getSongsLenght = () => {
        return (
            <span className="info-tracks">
                {`${(tracks || []).length} songs`}
            </span>
        )
    }

    return (
        <StyledHeader className="row">
            {(images.length && images[0].url &&
                <div className="artwork col-auto d-none d-lg-block">
                    <img src={images[0].url} alt={name || ''}/>
                </div>
            )}
            <div className="col info d-flex flex-column">
                <strong className="info-type">{type}</strong>
                <h3 className="info-name">{name}</h3>
                    {getDescription(description)}
                <div className="info-details">
                    {
                        (owner || {}).display_name && (
                            <span className="info-owner">
                                Created by <strong>{(owner || {}).display_name}</strong>
                            </span>
                        )
                    }
                        {type !== 'artist' && getSongsLenght() }
                        { total_duration && tracksDuration() }
                </div>
                <div className="info-interactive">
                    <div className="play" onClick={ () => { player.play({device_id, uris : (tracks || []) })}}> PLAY </div>
                </div>
            </div>
        </StyledHeader>
    )
}

export default TracklistHeader;
