import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { getPlaylists, setView } from "../../actions";

const StyledList = styled.ul`
    list-style: none;
    padding: 15px;
    white-space: nowrap;
    color : #B3B3B3;

    .fixed-pages {
        position: sticky;

        li {
            padding: 0;
            margin-bottom: 15px;
            font-size: 14px;
            font-weight: 700;
            svg {
                margin-right: 10px;
                font-weight: 500;
                font-size: 18px;
            }
        }
    }

    li {
        padding: 0;
        cursor: pointer;
        font-size: 13px;
        font-weight: 800;
        margin-bottom: 8px;

        &.lead {
            margin-bottom: 0;
            font-size: 14px;
            font-weight: 100;
            text-transform: uppercase;
            margin-bottom: 10px;
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

class Menu extends React.Component {
    constructor() {
        super();
        this.menuItems = [
            {
                name: "Home",
                uri: "home",
                el: <i className="home fas fa-home">home</i>,
            },
            {
                name: "Browse",
                uri: "browse",
                el: <i className="fa fa-folder-open" aria-hidden="true"></i>,
            },
            {
                el: <li key="your-library" className="lead"> Your Library </li>
            },
            {
                name: "Recently Played",
                uri: "recently-played"
            },
            {
                name: "Liked Songs",
                uri: "liked-songs"
            },
            {
                name: "Albums",
                uri: "albums"
            },
            {
                name: "Artists",
                uri: "artists"
            },
            {
                name: "Podcasts",
                uri: "podcasts"
            },
            {
                el: <li key="playlists" className="lead"> Playlists </li>
            }
        ];
    }
    componentWillMount() {
        this.props.getPlaylists();
    }
    renderList(item) {
        return (
            <li
                key={item.name}
                className={this.props.view === item.uri ? "active" : ""}
                data-owner={ (item || {}.owner).display_name ? `* by ${(item || {}.owner).display_name}`: "" }
                id={item.uri}
                onClick={() => this.props.setView({ uri: item.uri })}
                key={item.id}
            >
                {item.el ? item.el : ''} {item.name}
            </li>
        );
    }
    render() {
        return (
            <StyledList>
                <div class="fixed-pages">
                    {this.menuItems.map((i) => this.renderList(i))}
                </div>
                {(this.props.playlists.items || []).length && this.props.playlists.items.map((i) => this.renderList(i))}
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
    setView
})(Menu);
