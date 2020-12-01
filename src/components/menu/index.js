import React from "react";
import PropTypes from 'prop-types';

import './style.scss';

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
            <ul class="menu">
                <button onClick={logout}>logout</button>
                <div className="fixed-pages">
                    {menuItems.map((i) => renderList(i))}
                </div>
                {playlists.items.map((i) => renderList(i))}
            </ul>
        );
    } else {
        return (
            <ul class="menu">
                <div className="fixed-pages">
                    {menuItems.map((i) => renderList(i))}
                </div>
            </ul>
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
