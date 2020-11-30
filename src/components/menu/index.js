import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';

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
`

const Menu = ({playlists, setView, uri, logout, getPlaylists}) => {
    // Retorna a playlist do usuario
    !Object.keys(playlists).length && getPlaylists && getPlaylists();
    // Menu de itens fixos
    let  menuItems = [
        {
            name: "Home",
            uri: "home",
            icon: <i className="home fas fa-home">home</i>,
        },
        {
            name: "Browse",
            uri: "browse",
            icon: <i className="fa fa-folder-open" aria-hidden="true"></i>,
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
            name: "Bands",
            uri: "bands"
        },
        {
            name: "Podcasts",
            uri: "podcasts"
        },
        {
            el: <li key="lead-playlists" className="lead"> Playlists </li>
        }
    ];
    const renderList = (item) => {
        const { display_name } = (item || {}.owner)
        if(item.el) {
            return item.el;
        } else {
            return (
                <li
                    key={item.uri}
                    className={uri === item.uri ? "active" : ""}
                    data-owner={display_name ? `* by ${display_name}`: "" }
                    id={item.uri}
                    onClick={() => setView({ uri: item.uri })}
                >
                    {item.icon ? item.icon : ''} {item.name}
                </li>
            );
        }
    }
    if((playlists.items || []).length) {
        return (
            <StyledList>
                <button onClick={logout}>logout</button>
                <div className="fixed-pages">
                    {menuItems.map((i) => renderList(i))}
                </div>
                {playlists.items.map((i) => renderList(i))}
            </StyledList>
        );
    } else {
        return (
            <StyledList>
                <div className="fixed-pages">
                    {menuItems.map((i) => renderList(i))}
                </div>
            </StyledList>
        );
    }
}

Menu.propTypes = {
    playlists : PropTypes.object,
    uri : PropTypes.string,
    setView : PropTypes.func,
    logout : PropTypes.func
}

export default Menu;
