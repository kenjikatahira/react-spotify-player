import React from "react";
import { connect } from "react-redux";
import Styled from 'styled-components';

import {
    setView,
    clearView
} from "../../actions";

import Loading from "./../loading";

const StyledGrid = Styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 32px 24px;

    .albums-row {
        display: flex;
        flex-direction: row;
        flex-flow: row wrap;
        width: 100%;
        padding: 10px 0;
        margin-bottom: 25px;
        .album {
            width: 240px;
            cursor: pointer;
            .image {
                width: 240px;
                height:240px;
            }
            .card-body {
                padding: 10px 0;
            }
            .card-body .card-text {
                display : block;
                white-space: pre-wrap;
            }
        }
    }
`



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
                <StyledGrid className="grid">
                    {Object.values(grid).map(this.renderRow.bind(this))}
                </StyledGrid>
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
