import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setView } from './../../actions';

const StyledList = styled.div`
    .filter {
        input {
            font-size:14px;
        }
    }
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
            &:fist-child {
                width: 30px;
            }
        }

        tr {
            &:not(.header):hover td {
                background: rgba(255, 255, 255, 0.1);
            }
        }

        td {
            &:nth-child(1) {
                width: 20px;
            }
            &:last-child {
                width: 80px;
                text-align: center;
            }
        }

        tr,
        td {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            cursor: pointer;
            padding: 8px;
            white-space: nowrap;
            max-width: 220px;
            overflow: hidden;

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

class Tracklist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredItems : []
        }
    }
    setArtist ({ artist, total, index }) {
        const { id, uri, name } = artist;
        return (
            <span
                key={id+'#'+index}
                onClick={(ev) => {
                    ev.stopPropagation();
                    this.props.setView({ uri });
                }}
            >
                {total > 1 && index !== total - 1 ? `${name}, ` : name}
            </span>
        );
    }

    setAlbum(ev,item) {
        ev.stopPropagation();
        this.props.setView({ uri: item.album.uri });
    }

    renderList(item,index) {
        return (
            <tr
                key={item.id+'#'+index}
                onClick={() => {
                    if (this.props.device_id) {
                        this.props.player.play({
                            uri: item.uri,
                            uris: this.props.view.tracks,
                            device_id: this.props.device_id,
                        });
                    }
                }}
            >
                <td>
                    <span><i className="play fas fa-play"></i></span>
                </td>
                {
                    item.name &&
                    <td>
                        <span>{item.name}</span>
                    </td>
                }
                {
                    item.artists &&
                    <td>
                        {item.artists && Object.values(item.artists).map((artist, index) => this.setArtist({ artist,total: (item.artists || []).length, index }))}
                    </td>
                }
                {
                    item.album &&
                    <td>
                        <span onClick={(ev) => this.setAlbum(ev,item)}> {item.album.name} </span>
                    </td>
                }
                {
                item.duration_ms &&
                <td>
                    <span> {item.duration_ms} </span>
                </td>
                }
            </tr>
        );
    }

    onFilter(ev) {
            this.setState({
            filteredItems : this.props.view.table.body.filter(({name}) => name.toLowerCase().replace('ã','a').indexOf(ev.target.value.toLowerCase()) > -1 )
        })
    }

    render() {
        if (this.props.view.tracks) {
            return (
                <>
                    <StyledList>
                        <div className="filter">
                            <input type="text" placeholder="Filter" onChange={(ev) => { this.onFilter(ev) }} />
                        </div>
                        <table className="table">
                            <thead>
                                <tr className="header">
                                    <th scope="col"></th>
                                    {this.props.view.table.head.map(i => (<th key={i}>{i}</th>))}
                                </tr>
                            </thead>
                            <tbody>
                                {((this.state.filteredItems || []).length > 0 ? this.state.filteredItems : this.props.view.table.body).map((i,index) => this.renderList(i,index))}
                            </tbody>
                        </table>
                    </StyledList>
                </>
            );
        } else {
            return <> Loading... </>;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        view: state.view,
        player: state.player,
    };
};

export default connect(mapStateToProps,{ setView })(Tracklist);
