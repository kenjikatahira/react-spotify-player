import React, { useState, useEffect, useContext } from "react";

import { getViewRoute } from './../api';
import { SpotifyContext } from "../components/main";

import TracklistHeader from "./../components/tracklistHeader";
import Tracklist from "./../components/tracklist";
import Loading from "../components/loading";
import Grid from "../components/grid";

const Album = () => {
    const {uri,player,setUri,setTopBar, currentTrack} = useContext(SpotifyContext);
    const [data,setData] = useState(null);

    useEffect(() => {
        if(!data) {
            getViewRoute({uri})
                .then(setData);
        } else {
            setTopBar(data.header.name);
        }
    },[data,uri,setTopBar]);

    // reseta o data
    useEffect(() => {
        setData(null);
    },[uri])

    if (data) {
        const {table,header,label,releaseDate,grid} = data;
        return (
            <div className="album">
                <TracklistHeader
                    player={player}
                    header={header}
                    isPlaying={((currentTrack || {}).disallows || {}).resuming}
                />
                <Tracklist
                    table={table}
                    setUri={setUri}
                    player={player}
                    copyright={`© ${releaseDate} ${label}`}
                    currentTrack={currentTrack}
                />
                <Grid grid={grid} setUri={setUri} player={player} />
            </div>
        );
    } else {
        return (
            <Loading />
        );
    }
}

export default Album;
