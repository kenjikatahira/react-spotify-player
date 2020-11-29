import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import {
    getHome,
    setView
} from "../../actions";

const StyledHome = styled.main`
    .albums-row {
        display: flex;
        flex-direction: row;
        overflow: hidden;
        width: 100%;
        white-space: nowrap;
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

`;

class Main extends React.Component {
    renderAlbums(playlist) {
        return (
            <div className="album col-sm-3" onClick={() => { this.props.setView({uri : playlist.uri}) }} key={playlist.id}>
                <div class="image" style={
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
                <div class="albums-row" key={row.type}>
                    {row.items.map(this.renderAlbums.bind(this))}
                </div>
            </>
        )
    }
    componentDidMount() {
        this.props.getHome();
    }
    render() {
        if(Object.keys(this.props.home).length) {
            return (
                <>
                    <StyledHome>
                        <div className="container">
                            {Object.values(this.props.home).map(this.renderRow.bind(this))}
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
        home: state.home
    };
};

export default connect(mapStateToProps, {
    getHome,
    setView
})(Main);
