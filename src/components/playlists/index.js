import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { getPlaylists, setView } from "../../actions";

const StyledList = styled.ul`
    list-style: none;
    padding: 15px;
    white-space: nowrap;

    .fixed-pages {
        position: sticky;
    }

    li {
        padding: 0 3px;
        cursor : pointer;
        margin-bottom: 5px;

        &.lead {
            margin-bottom: 0;
        }

        &.active:before {
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
        this.fixedPages = [
            {
                name: "Home",
                uri: "home",
                icon: <i className="home fas fa-home">home</i>,
            },
        ];
    }
    componentWillMount() {
        this.props.getPlaylists();
    }
    renderList(item) {
        return (
            <li
                key={item.uri}
                className={this.props.view === item.uri ? "active" : ""}
                data-owner={ (item || {}.owner).display_name ? `* by ${(item || {}.owner).display_name}`: "" }
                id={item.uri}
                onClick={() => this.props.setView({ uri: item.uri })}
                key={item.id}
            >
                {item.icon ? item.icon : ''} {item.name}
            </li>
        );
    }
    render() {
        return (
            <StyledList>
                <div class="fixed-pages">
                    {this.fixedPages.map((i) => this.renderList(i))}
                </div>
                <li key="playlist" className="lead">
                    PLAYLISTS
                </li>
                {(this.props.playlists.items || []).length &&
                    this.props.playlists.items.map((i) => this.renderList(i))}
            </StyledList>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        playlists: state.playlists,
        view: state.view,
    };
};

export default connect(mapStateToProps, {
    getPlaylists,
    setView,
})(Main);
