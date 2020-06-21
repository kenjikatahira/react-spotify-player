import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import {
    getFeaturedPlaylist,
    setView
} from "../../actions";

const StyledHome = styled.main`

`;

class Main extends React.Component {
    renderAlbums(playlist) {
        console.log(playlist)
        return (
            <div className="item col-sm-3" onClick={() => { this.props.setView({uri : playlist.uri}) }} key={playlist.id}>
            <img className="img-thumbnail" src={playlist.images[0].url} alt={playlist.name}/>
                <div className="card-body">
                    <h5 className="card-title">{playlist.name}</h5>
                    <small className="card-text">{playlist.description}</small>
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.props.getFeaturedPlaylist();
    }
    render() {
        const { playlists } = (this.props.home || {});
        if((this.props.home || {}).playlists) {
            return (
                <>
                    <StyledHome>
                        <div className="container">
                            <div className="row">
                                {playlists.items.map(this.renderAlbums.bind(this))}
                            </div>
                        </div>
                    </StyledHome>
                </>
            );
        } else {
            return (
                <>
                <StyledHome>
                    Loading...
                </StyledHome>
                </>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        home: state.home,
        view : state.view,
        device_id: state.device_id
    };
};

export default connect(mapStateToProps, {
    getFeaturedPlaylist,
    setView
})(Main);
