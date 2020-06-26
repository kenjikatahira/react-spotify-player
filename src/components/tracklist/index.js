import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setView } from './../../actions';

const StyledList = styled.div`
    table {
        list-style: none;
        margin: 0;
        padding: 10px;
        color: #f5f5f5;

        th {
            color: #d1d1d1;
            font-size: 13px;
            text-transform: uppercase;
            border-top: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        tr {
            &:not(.header):hover td {
                background: rgba(255, 255, 255, 0.1);
            }
        }

        td {
            &:nth-child(2) {
                width: 300px;
            }
        }

        tr,
        td {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            cursor: pointer;
            padding: 8px;
            white-space: nowrap;

            &:hover {
                .play {
                    visibility: visible;
                }
            }

            .play {
                visibility: hidden;
            }

            span:hover {
                border-bottom: 1px solid #fff;
            }
        }
    }
`;

const Tracklist = (props) => {
    const setArtist = ({ artist, total, index }) => {
        const { uri, name } = artist;
        return (
            <span
                key={uri}
                onClick={(ev) => {
                    ev.stopPropagation();
                    props.setView({ uri });
                }}
            >
                {total > 1 && index !== total - 1 ? `${name}, ` : name}
            </span>
        );
    }

    const setAlbum = (ev,item) => {
        ev.stopPropagation();
        props.setView({ uri: item.album.uri });
    }

    const renderList = (item) => {
        return (
            <tr
                key={item.id}
                onClick={() => {
                    if (props.device_id) {
                        props.player.play({
                            uri: item.uri,
                            uris: props.player.tracks,
                            device_id: props.device_id,
                        });
                    }
                }}
            >
                <td>
                    <span><i className="play fas fa-play"></i></span>
                </td>
                <td>
                    <span>{item.name}</span>
                </td>
                <td>
                    {Object.values(item.artists).map((artist, index) => setArtist({ artist,total: (item.artists || []).length, index }))}
                </td>
                <td>
                    <span onClick={(ev) => setAlbum(ev,item)}> {item.album.name} </span>
                </td>
                <td>
                    <span> {props.player.setTrackDuration(item.duration_ms)} </span>
                </td>
            </tr>
        );
    }

    if (props.player.tracks) {
        return (
            <>
                <StyledList>
                    <table className="table">
                        <thead>
                            <tr class="header">
                                <th scope="col"></th>
                                <th scope="col">Title</th>
                                <th scope="col">Artist</th>
                                <th scope="col">Album</th>
                                <th scope="col"><i className="clock fas fa-clock"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.player.tracks.map((i) => renderList(i))}
                        </tbody>
                    </table>
                </StyledList>
            </>
        );
    } else {
        return <> Loading... </>;
    }
}

const mapStateToProps = (state) => {
    return {
        player: state.player
    };
};

export default connect(mapStateToProps,{ setView })(Tracklist);
