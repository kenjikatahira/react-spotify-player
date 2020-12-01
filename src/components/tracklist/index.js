import React from "react";
import { connect } from "react-redux";

import './style.scss';

import { setView } from './../../actions';

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
                        <span className="link">{item.artists && Object.values(item.artists).map((artist, index) => this.setArtist({ artist,total: (item.artists || []).length, index }))}</span>
                    </td>
                }
                {
                    item.album &&
                    <td>
                        <span className="link" onClick={(ev) => this.setAlbum(ev,item)}> {item.album.name} </span>
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
                    <div className="tracklist">
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
                    </div>
                </>
            );
        } else {
            return <> Loading... </>;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        player: state.player
    };
};

export default connect(mapStateToProps,{ setView })(Tracklist);
