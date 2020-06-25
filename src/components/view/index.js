import React from "react";
import Home from "../home";
import Playlist from "../playlist";
import Artist from "../artist";

const View = (props) => {
    const { view } = props;
    return (
            <>
                {props.view.indexOf('album') >= 0 ? (
                    'album'
                ) : props.view.indexOf('artist') >= 0 ? (
                    <Artist />
                ) : props.view.indexOf('playlist') >= 0 ? (
                    <Playlist />
                ) : props.view.indexOf('home') >= 0 ? (
                    <Home />
                ) : (
                    <Playlist />
                )}
            </>
    );

}

export default View;
