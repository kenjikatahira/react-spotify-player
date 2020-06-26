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
                ) : view.indexOf('artist') >= 0 ? (
                    <Artist />
                ) : view.indexOf('playlist') >= 0 ? (
                    <Playlist />
                ) : view.indexOf('home') >= 0 ? (
                    <Home />
                ) : (
                    <Playlist />
                )}
            </>
    );

}

export default View;
