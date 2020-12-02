import React from "react";
import { connect } from "react-redux";

import './style.scss';

import {
    getHome,
    setView
} from "../../actions";
import Loading from "../../components/grid/loading";

class Main extends React.Component {

    componentDidMount() {
        this.props.getHome();
    }

    renderAlbums(playlist) {
        return (
            <div className="album col-sm-3" onClick={() => { this.props.setView({uri : playlist.uri}) }} key={playlist.id}>
                <div className="image" style={
                    { backgroundImage: `url(${playlist.images.length && playlist.images[0].url})`, backgroundSize :'cover', backgroundPosition:'center center' }
                }></div>
                <div className="card-body">
                    <p className="card-title">{playlist.name}</p>
                    <small className="card-text">{playlist.description}</small>
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
        if(Object.keys(this.props.home).length) {
            return (
                <div className="home">
                    {Object.values(this.props.home).map(this.renderRow.bind(this))}
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
        home: state.home
    };
};

export default connect(mapStateToProps, {
    getHome,
    setView
})(Main);
