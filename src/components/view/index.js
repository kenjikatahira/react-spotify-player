import React from "react";
import Home from "../home";
import Playlist from "../playlist";
import Artist from "../artist";

const View = (props) => {
    const { uri } = props;
    return (
            <>
                {props.uri.indexOf('album') >= 0 ? (
                    'album'
                ) : uri.indexOf('artist') >= 0 ? (
                    <Artist />
                ) : uri.indexOf('playlist') >= 0 ? (
                    <Playlist />
                ) : uri.indexOf('home') >= 0 ? (
                    <Home />
                ) : (
                    'sem tpl'
                )}
            </>
    );

}

export default View;
