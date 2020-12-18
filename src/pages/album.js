import React, { useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';

import { getViewRoute } from './../api';
import { SpotifyContext } from "../components/main";

import TracklistHeader from "./../components/tracklistHeader";
import Tracklist from "./../components/tracklist";
import Loading from "../components/loading";
import Grid from "../components/grid";

const Album = () => {
    const {uri,player,setUri,setTopBar} = useContext(SpotifyContext);
    const [data,setData] = useState(null);

    useEffect(() => {
        if(!data) {
            getViewRoute({uri})
                .then(setData);
        } else {
            setTopBar(data.header.name);
        }
    },[data,uri]);

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
                />
                <Tracklist
                    table={table}
                    setUri={setUri}
                    player={player}
                    copyright={`© ${releaseDate} ${label}`}
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

Album.propTypes = {
    player : PropTypes.object,
    setUri : PropTypes.func,
    uri : PropTypes.string
}

export default Album;
