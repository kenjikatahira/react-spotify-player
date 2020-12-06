import React from "react";
import { connect } from "react-redux";
import Styled from 'styled-components';

import {
    setView,
    clearView
} from "../../actions";

import Loading from "./../loading";

const StyledGrid = Styled.div`
    width:90%;
    margin:0 auto;
    .albums-row {
        display: flex;
        flex-direction: row;
        flex-flow: row wrap;
        width: 100%;
        padding: 10px 0;
        margin-bottom: 25px;
        padding: 10px;
        resize: horizontal;
        overflow: auto;
        max-width: 100%;
        .album {
            padding-right: 5px;
            padding-left: 5px;
            cursor: pointer;
            .image {
                width: 100%;
                padding-bottom: 100%;
            }
            .card-title {
                font-size: 12px;
            }
            .card-body {
                padding: 10px 0;
            }
            .card-body .card-text {
                display : block;
                font-weight: bold;
                font-size:13px;
                padding: 0;
                margin: 0;
            }
        }
    }
`

class Grid extends React.Component {

    componentWillUnmount() {
        this.props.clearView();
    }

    renderAlbums({images,uri,id,name,artists}) {
        return (
            <div className="album col-xs-12 col-sm-6 col-md-4 col-lg-3" key={id}>
            <div className="image" onClick={(ev) => { this.props.setView({uri});}} style={
                { backgroundImage: `url(${images.length && images[0].url})`, backgroundSize :'cover', backgroundPosition:'center center' }
            }></div>
            <div className="card-body">
                <p className="card-text" onClick={(ev) => { ev.stopPropagation(); this.props.setView({uri : artists && artists[0].uri}) }}>{ artists && artists[0].name}</p>
                <p className="card-title" onClick={(ev) => { ev.stopPropagation(); this.props.player.play({ uri : uri }) }}>{name}</p>
                <p>PLAY</p>
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
