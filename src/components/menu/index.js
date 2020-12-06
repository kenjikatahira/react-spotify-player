import React from "react";
import PropTypes from 'prop-types';
import Styled from 'styled-components';

import SpotifyLogo from './../../svg/spotify';

const StyledMenu = Styled.ul`
    list-style: none;
    padding: 15px;
    white-space: nowrap;
    color : #B3B3B3;
    background: #000;

    .logo-wrapper {
        display:flex;
        flex-direction: row;
        justify-content: space-between;

        .spotify-logo {
            width:120px;
            padding-right: 0;
            padding-left:5px;
            display:inline-block;
            color:#fff;
            align-self: center;
        }

        .made {
            padding: 10px 0;
            margin-left: 5px;
            align-self: center;
            font-size: 14px;
            text-align: center;
        }
    }

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

    hr   {
        display: block;
        unicode-bidi: isolate;
        margin-block-start: 0.9em;
        margin-block-end: 0.9em;
        margin-inline-start: auto;
        margin-inline-end: auto;
        background: #282828;
    }

    li {
        position:relative;
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
            content : "";
            border-left: 3px solid #1db954;
            position: absolute;
            height: 17px;
            left: -8px;
            top: 0;
        }

        &:hover:after {
                content: attr(data-owner);
                position: relative;
                height:10px;
                font-size: 12px;
                left: 0px;
                color: #ccc;
                white-space: nowrap;
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
            icon: <i className="fas fa-home">home</i>,
        },
        // {
        //     name: "Browse",
        //     uri: "browse",
        //     icon: <i className="fa fa-folder-open" aria-hidden="true"></i>,
        // },
        {
            el: <li key="your-library" className="lead"> Your Library </li>
        },
        {
            name: "Saved",
            uri: "saved-tracks"
        },
        // {
        //     name: "Recently Played",
        //     uri: "recently-played"
        // },
        // {
        //     name: "Liked Songs",
        //     uri: "liked-songs"
        // },
        // {
        //     name: "Albums",
        //     uri: "albums"
        // },
        // {
        //     name: "Bands",
        //     uri: "bands"
        // },
        // {
        //     name: "Podcasts",
        //     uri: "podcasts"
        // },
        {
            el: <><hr className="separator"></hr><li key="lead-playlists" className="lead"> Playlists </li></>
        }
    ];
    const renderList = (item) => {
        const display_name = ((item || {}).owner || {}).display_name
        if(item.el) {
            return item.el;
        } else {
            return (
                <li
                    key={item.uri}
                    className={uri === item.uri ? "active" : ""}
                    data-owner={display_name ? ` * by ${display_name}`: "" }
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
            <StyledMenu className="menu">
                <div className="logo-wrapper">
                    <SpotifyLogo />
                    <span className="made"><a href="https://github.com/kenjikatahira/react-spotify-player/">github</a></span>
                </div>
                <hr className="separator"></hr>
                <div className="fixed-pages">
                    {menuItems.map((i) => renderList(i))}
                </div>
                <div className="playlists-wrapper">
                    {playlists.items.map((i) => renderList(i))}
                </div>
            </StyledMenu>
        );
    } else {
        return (
            <StyledMenu className="menu">
                <div className="fixed-pages">
                    {menuItems.map((i) => renderList(i))}
                </div>
            </StyledMenu>
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
