import React from 'react';
import Styled from 'styled-components';

const StyledHeader = Styled.div`
        padding: 10px 0;
        margin-bottom: 15px;

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
                font-size: 48px;
                font-weight: 600;
                margin-bottom: 0;
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
                width: 106px;
                padding: 4px;
                text-align: center;
            }
        }
`


const TracklistHeader = ({props}) => {

    const {tracks, images, name, description, owner, total_duration,type } = props;

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
                <span className="info-description">
                    {description}
                </span>
                <div className="info-details">
                    <span className="info-owner">
                        Created by <strong>{(owner || {}).display_name}</strong>
                    </span>
                    <span className="info-tracks">
                        {(tracks || []).length} songs,
                    </span>
                    <span className="info-duration">
                        {props.setTrackDuration(total_duration)}
                    </span>
                </div>
                <div className="info-interactive">
                    <div className="play"> PLAY </div>
                </div>
            </div>
        </StyledHeader>
    )
}

export default TracklistHeader;
