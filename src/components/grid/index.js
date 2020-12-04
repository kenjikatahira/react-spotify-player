import React from "react";
import { connect } from "react-redux";

import './style.scss';

import {
    setView,
    clearView
} from "../../actions";

import Loading from "./../loading";

class Grid extends React.Component {

    componentWillUnmount() {
        this.props.clearView();
    }

    renderAlbums({ uri, name, images, artists, id }) {
        return (
            <div className="album col-sm-3" onClick={(ev) => { ev.stopPropagation(); this.props.setView({uri : uri}) }} key={id}>
                <div className="image" style={
                    { backgroundImage: `url(${images.length && images[0].url})`, backgroundSize :'cover', backgroundPosition:'center center' }
                }></div>
                <div className="card-body" onClick={(ev) => { ev.stopPropagation(); this.props.player.play({ uri : uri }) }}>
                    <p>PLAY</p>
                    <p className="card-title">{name}</p>
                    <small className="card-text" onClick={(ev) => { ev.stopPropagation(); this.props.setView({uri : artists[0].uri}) }}>{artists[0].name}</small>
                </div>
            </div>
        )
    }

    renderRow({message,type,items}) {
        return (
            <>
                <h2> {message} </h2>
                <div className="albums-row" key={type}>
                    {items.map(this.renderAlbums.bind(this))}
                </div>
            </>
        )
    }

    render() {
        const { grid } = this.props;
        if(grid && Object.keys(grid).length) {
            return (
                <div className="grid">
                    {Object.values(grid).map(this.renderRow.bind(this))}
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
        player: state.player
    };
};

export default connect(mapStateToProps, {
    setView,
    clearView
})(Grid);
