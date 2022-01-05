import React,{ useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Styled from 'styled-components';

import { fetchPlaylists } from './../api';

import SpotifyLogo from './../assets/spotify';

const StyledMenu = Styled.ul`
    list-style: none;
    padding: 15px;
    white-space: nowrap;
    color : #B3B3B3;
    margin-bottom: 0;

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
            font-size: 12px;
            text-align: center;
        }
    }

    .fixed-pages {
        position: sticky;

        li {
            padding: 0;
            margin-bottom: 15px;
            font-size: 13px;
            font-weight: 700;
            svg {
                margin-right: 10px;
                font-weight: 500;
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
        font-size: 11px;
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
            left: -14px;
            top: 0;
        }

        &:hover:after {
            content: attr(data-owner);
            position: relative;
            height:10px;
            left: 0px;
            color: #ccc;
            white-space: nowrap;
        }
    }
`

// Menu de itens fixos
let  menuItems = [
    {
        name: "Home",
        uri: "home",
        icon: <i key="home" className="fas fa-home">home</i>,
    },
    {
        name: "Browse",
        uri: "browse",
        icon: <i key="browse" className="fa fa-folder-open" aria-hidden="true"></i>,
    },
    {
        el: <li key="your-library" className="lead"> Your Library </li>
    },
    {
        name: "Recently Played",
        uri: "recently-played"
    },
    {
        name: "Countries",
        uri: "featured-playlists-countries"
    },
    {
        name: "Liked Songs",
        uri: "liked-songs"
    },
    {
        name: "Artists",
        uri: "artists-list"
    },
    {
        el: <hr key="sep" className="separator"></hr>
    },
    {
        el: <li key="lead-playlists" className="lead"> Playlists </li>
    }
];

const Menu = ({uri, setUri}) => {
    const [playlists,setPlaylists] = useState(null)

    useEffect(() => {
        if(!playlists) {
            fetchPlaylists()
                .then(setPlaylists);
        }
    },[playlists]);

    const renderList = (item,index) => {
        const display_name = ((item || {}).owner || {}).display_name
        if(item.el) {
            return item.el;
        } else {
            return (
                <li
                    key={item.uri+'#'+index}
                    className={uri === item.uri ? "active" : ""}
                    data-owner={display_name ? ` * by ${display_name}`: "" }
                    id={item.uri}
                    onClick={() => setUri(item.uri)}
                >
                    {item.icon ? item.icon : ''} {item.name}
                </li>
            );
        }
    }
    if(((playlists || {}).items || []).length) {
        return (
            <StyledMenu className="menu">
                <div className="logo-wrapper">
                    <SpotifyLogo />
                    <span className="made"><a target="_blank" rel="noopener noreferrer" href="https://github.com/sleepy-monk/react-spotify-player/">github</a></span>
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
                <div className="logo-wrapper">
                    <SpotifyLogo />
                    <span className="made"><a target="_blank" rel="noopener noreferrer" href="https://github.com/sleepy-monk/react-spotify-player/">github</a></span>
                </div>
                <hr className="separator"></hr>
                <div className="fixed-pages">
                    {menuItems.map((i) => renderList(i))}
                </div>
            </StyledMenu>
        );
    }
}

Menu.propTypes = {
    uri : PropTypes.string,
    setUri : PropTypes.func
}

export default Menu;
