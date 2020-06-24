import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getPlayer,setView } from "../../actions";

const StyledList = styled.div`
    padding: 20px 0;
    .info {
        padding: 10px 0;
        margin-bottom: 15px;

        img {
            width: 350px;
            padding: 15px;
        }
    }

    table {
        list-style: none;
        margin: 0;
        padding: 10px;

        tr {
            &:not(.header):hover td{
                background:rgba(255,255,255,.1);
            }
        }

        tr,td {
            background: rgba(24, 24, 24,1);
            cursor: pointer;

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
    setTrackDuration(duration) {
        const minutes = Math.floor(duration / 60000);
        const seconds = ((duration % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }
    setArtist(item = {},index) {
        const { uri,name } = item;
        if((item.artists || []).length > 1 && index != (item.artists || []).length-1) {
            return (
            <span
                key={uri}
                onClick={() => {
                    this.props.setView({uri});
                }}
            >
                {name},
            </span>
            )
        } else {
            return (
            <span
                key={uri}
                onClick={() => {
                    this.props.setView({uri});
                }}
            >
                {name}
            </span>
            );
        }
    }
    renderList(item,index) {
        return (
            <tr key={item.id}>
                <td>
                    <i className="play fas fa-play"></i>
                    {/* <i className="fas fa-pause"></i> */}
                </td>
                <td>
                    <span onClick={() => {
                        if(this.props.device_id) {
                            this.props.player.play({
                                uri : item.uri,
                                uris : this.props.player.tracks,
                                device_id : this.props.device_id
                            });
                        }
                    }}>
                        {item.name}
                    </span>
                </td>

                <td >
                    {Object.values(item.artists).map((i) => this.setArtist(i) )}
                </td>
                <td>
                    <span
                        onClick={() => {
                            this.props.setView({uri : item.album.uri});
                        }}
                    >
                    {item.album.name}
                    </span>
                </td>
                <td>{this.setTrackDuration(item.duration_ms)}</td>
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
        const { tracks, images, name, description } = this.props.player;
        if (tracks) {
            return (
                <>
                    <StyledList>
                        <div className="container row">
                            <div className="info row">
                                <div className="col-auto d-none d-lg-block">
                                    <img src={images[0].url} alt={name || ''}/>
                                </div>
                                <div className="col p-4 d-flex flex-column position-static">
                                    <strong className="d-inline-block mb-2 text-primary">{}</strong>
                                    <h3 className="mb-0">{name}</h3>
                                    <p className="card-text mb-auto">{description}</p>
                                    <div className="mb-1 text-muted">Nov 12</div>
                                </div>
                            </div>
                            <table className="table table-striped table-dark">
                                <thead>
                                    <tr class="header">
                                        <th scope="col"></th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Artist</th>
                                        <th scope="col">Album</th>
                                        <th scope="col">length</th>
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
