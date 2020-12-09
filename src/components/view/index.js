import React from "react";
import Home from "../../pages/home";
import Album from "../../pages/album";
import Artist from "../../pages/artist";
import Playlist from "../../pages/playlist";
import GenericGrid from "../../pages/genericGrid";
import SavedTracks from "../../pages/saved-tracks";

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
                <GenericGrid uri={uri} />
            )}
        </>
    );

}

export default View;
