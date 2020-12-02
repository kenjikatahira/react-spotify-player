import React from "react";
import Home from "../../pages/home";
import Playlist from "../../pages/playlist";
import Artist from "../../pages/artist";
import SavedTracks from "../../pages/saved-tracks";
import Album from "../../pages/album";

const View = (props) => {
    const { uri } = props;
    return (
            <>
                {props.uri.indexOf('album') >= 0 ? (
                    <Album />
                ) : uri.indexOf('artist') >= 0 ? (
                    <Artist />
                ) : uri.indexOf('playlist') >= 0 ? (
                    <Playlist />
                ) : uri.indexOf('home') >= 0 ? (
                    <Home />
                ) : uri.indexOf('saved-tracks') >= 0 ? (
                    <SavedTracks />
                ) : (
                    'TRISTE'
                )}
            </>
    );

}

export default View;
