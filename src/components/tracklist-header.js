import React from 'react';
import { connect } from "react-redux";
import Styled from 'styled-components';

const StyledHeader = Styled.div`
        padding: 15px 32px;
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

class TracklistHeader extends React.Component {
    getDescription(description) {
        return (
            <>
                <div dangerouslySetInnerHTML={{__html: description }} />
            </>
        )
    }

    tracksDuration(total_duration) {
        return (
            <span className="info-duration">
                {`- ${total_duration} hrs`}
            </span>
        )
    }

    getSongsLenght(tracks) {
        return (
            <span className="info-tracks">
                {`${(tracks || []).length} songs`}
            </span>
        )
    }

    render() {
        const {
            tracks,
            image,
            name,
            description,
            owner,
            total_duration,
            type
        } = this.props.header;

        return (
            <StyledHeader className="tracklist-header">
                {(image && image.url &&
                    <div className="artwork">
                        <img src={image.url} alt={name || ''}/>
                    </div>
                )}
                <div className="col info d-flex flex-column">
                    <strong className="info-type">{type}</strong>
                    <h3 className="info-name">{name}</h3>
                        {this.getDescription(description)}
                    <div className="info-details">
                        {
                            (owner || {}).display_name && (
                                <span className="info-owner">
                                    Created by <strong>{(owner || {}).display_name}</strong>
                                </span>
                            )
                        }
                            { type !== 'artist' && this.getSongsLenght(tracks) }
                            { type !== 'artist' && total_duration && this.tracksDuration(total_duration) }
                    </div>
                    <div className="info-interactive">
                        <div className="play" onClick={ () => { this.props.player.play({uris : (tracks || []) })}}> PLAY </div>
                    </div>
                </div>
            </StyledHeader>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        player: state.player
    };
};

export default connect(mapStateToProps, {})(TracklistHeader);
