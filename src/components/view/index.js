import React from "react";
import Home from "../home";
import TrackList from "../tracklist";

const View = (props) => {
    const { view } = props;
    return (
            <>
                {props.view.indexOf('album') >= 0 ? (
                    'album'
                ) : props.view.indexOf('artist') >= 0 ? (
                    'artist'
                ) : props.view.indexOf('playlist') >= 0 ? (
                    <TrackList view={view} />
                ) : props.view.indexOf('home') >= 0 ? (
                    <Home />
                ) : (
                    <TrackList />
                )}
            </>
    );

}

export default View;
