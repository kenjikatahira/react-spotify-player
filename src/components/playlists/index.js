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
    overflow: hidden;
    white-space: nowrap;

    li {
        padding: 5px;
        font-weight: bold;
        cursor : pointer;

        p.lead {
            margin-bottom: 0;
        }

        &.active:before {
            content: "";
            border-left: 3px solid #1db954;
            position: relative;
            left: -18px;
        }
        &:hover::after {
                content: attr(data-owner);
                position: relative;
                font-size: 12px;
                left: 10px;
                color: #fff;
                white-space: nowrap;
            }
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
            <li className={this.props.view === item.uri ? 'active' : ''} data-owner={`* by ${(item.owner || {}).display_name}`} id={item.uri} onClick={() => this.props.setView({uri : item.uri})} key={item.id}>{item.name}</li>
        )
    }
    render() {
        return(
            <StyledList>
                {this.fixedList.map((i) => this.renderList(i))}
                <li className="lead">PLAYLIST</li>
                {(this.props.playlists.items || []).length && this.props.playlists.items.map((i) => this.renderList(i))}
            </StyledList>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        playlists: state.playlists,
        view : state.view
    };
};

export default connect(mapStateToProps, {
    getPlaylists,
    setView
})(Main);
