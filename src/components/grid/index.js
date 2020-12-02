import React from "react";
import { connect } from "react-redux";

import './style.scss';

import {
    setView
} from "../../actions";
import Loading from "./loading";

class Grid extends React.Component {
    renderAlbums(data) {
        return (
            <div className="album col-sm-3" onClick={(ev) => { ev.stopPropagation(); this.props.setView({uri : data.uri}) }} key={data.id}>
                <div className="image" style={
                    { backgroundImage: `url(${data.images.length && data.images[0].url})`, backgroundSize :'cover', backgroundPosition:'center center' }
                }></div>
                <div className="card-body" onClick={(ev) => { ev.stopPropagation(); this.props.player.play({uri : data.uri, device_id : this.props.device_id }) }}>
                    <p>PLAY</p>
                    <p className="card-title">{data.name}</p>
                    <small className="card-text" onClick={(ev) => { ev.stopPropagation(); this.props.setView({uri : data.artists[0].uri}) }}>{data.artists[0].name}</small>
                </div>
            </div>
        )
    }

    renderRow(row) {
        return (
            <>
                <h2> {row.message} </h2>
                <div className="albums-row" key={row.type}>
                    {row.items.map(this.renderAlbums.bind(this))}
                </div>
            </>
        )
    }

    render() {
        if(Object.keys(this.props.grid).length && this.props.device_id) {
            return (
                <div className="grid">
                    {Object.values(this.props.grid).map(this.renderRow.bind(this))}
                </div>
            );
        } else {
            return (
                <Loading />
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        player: state.player,
        device_id : state.device_id
    };
};

export default connect(mapStateToProps, {
    setView
})(Grid);
