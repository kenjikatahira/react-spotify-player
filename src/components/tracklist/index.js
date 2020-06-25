import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getPlayer,setView } from "../../actions";
import TracklistHeader from "../tracklist-header";

const StyledList = styled.div`
    padding: 20px 0;
    .container {
        margin-left: 20px;
    }
    .filter {
        padding: 3px;
        input {
            width: 176px;
            height: 25px;
            border-radius: 27px;
            background: inherit;
            border-style: none;
            color: #F5F5F5;
        }
    }

    table {
        list-style: none;
        margin: 0;
        padding: 10px;
        color: #F5F5F5;

        th {
            color: #d1d1d1;
            font-size: 13px;
            text-transform: uppercase;
            border-top: none;
            border-bottom: 1px solid rgba(255,255,255,.1);
        }

        tr {
            &:not(.header):hover td{
                background:rgba(255,255,255,.1);
            }
        }

        td {
            &:nth-child(2) {
                width: 444px;
            }
        }

        tr,td {
            border-bottom: 1px solid rgba(255,255,255,.1);
            cursor: pointer;
            padding: 8px;

            &:hover {
                .play { visibility: visible;  }
            }

            .play { visibility: hidden; }

            span:hover {
                border-bottom: 1px solid #fff;
            }
        }
    }
`;
class Tracklist extends React.Component {
    componentWillMount() {
        this.props.getPlayer({ uri: this.props.view });
    }
    setArtist({item,total,index}) {
        const { uri,name } = item;
            return (
                <span
                    key={uri}
                    onClick={(ev) => {
                        ev.stopPropagation();
                        this.props.setView({uri});
                    }}
                >
                    {(total > 1 && index !== total-1) ? `${name}, ` : name}
                </span>
            );
    }

    renderList(item) {
        return (
            <tr key={item.id} onClick={() => {
                if(this.props.device_id) {
                    this.props.player.play({
                        uri : item.uri,
                        uris : this.props.player.tracks,
                        device_id : this.props.device_id
                    });
                }
            }}>
                <td>
                    <i className="play fas fa-play"></i>
                    {/* <i className="fas fa-pause"></i> */}
                </td>
                <td>
                    <span>
                        {item.name}
                    </span>
                </td>
                <td>
                    {Object.values(item.artists).map((artist,index) => {
                        return this.setArtist({
                            item: artist,
                            total : (item.artists || []).length,
                            index
                        })
                    })}
                </td>
                <td>
                    <span
                        onClick={(ev) => {
                            ev.stopPropagation();
                            this.props.setView({uri : item.album.uri});
                        }}
                    >
                    {item.album.name}
                    </span>
                </td>
                <td>{this.props.player.setTrackDuration(item.duration_ms)}</td>
            </tr>
        );
    }
    UNSAFE_componentWillUpdate(nextProps) {
        if (
            ((nextProps.player || {}).tracks || []).length &&
            ((this.props.player || {}).tracks || []).length &&
            this.props.view !== nextProps.view
            ) {
            this.props.getPlayer({ uri: nextProps.view });
        }
    }
    render() {
        const { tracks, images, name, description, owner, total_duration } = this.props.player;
        if (tracks) {
            return (
                <>
                    <StyledList>
                        <div className="container">
                            <TracklistHeader props={this.props.player} />
                            <div className="filter">
                                <input type="text" placeholder="filter" />
                            </div>
                            <table className="table">
                                <thead>
                                    <tr class="header">
                                        <th scope="col"></th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Artist</th>
                                        <th scope="col">Album</th>
                                        <th scope="col">
                                            <i className="clock fas fa-clock"></i>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tracks.map((i) => this.renderList(i))}
                                </tbody>
                            </table>
                        </div>
                    </StyledList>
                </>
            );
        } else {
            return <>loading</>;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        view: state.view,
        player: state.player,
        device_id: state.device_id,
    };
};

export default connect(mapStateToProps, {
    getPlayer,
    setView
})(Tracklist);
