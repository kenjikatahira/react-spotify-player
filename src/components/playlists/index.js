import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import {
    getPlaylists,
    setView
} from "../../actions";

const StyledList = styled.ul`
    list-style: none;
    padding: 15px;

    li {
        padding: 5px;
        font-weight: bold;

        p.lead {
            margin-bottom: 0;
        }

        .active:before {
            content: "";
            border-left: 3px solid #1db954;
            position: relative;
            left: -18px;
        }
    }
`;

class Main extends React.Component {
    constructor() {
        super();
        this.fixedList = [
            {
                name : 'Home',
                uri : 'home'
            }
        ]
    }
    componentWillMount() {
        this.props.getPlaylists();
    }
    renderList(item) {
        return (
            <li onClick={() => this.props.setView({uri : item.uri})} key={item.id}>{item.name}</li>
        )
    }
    render() {
        return(
            <StyledList>
                {this.fixedList.map((i) => this.renderList(i))}
                <li>
                    <p class="lead">PLAYLIST</p>
                </li>
                {(this.props.playlists.items || []).length && this.props.playlists.items.map((i) => this.renderList(i))}
            </StyledList>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        playlists: state.playlists
    };
};

export default connect(mapStateToProps, {
    getPlaylists,
    setView
})(Main);
