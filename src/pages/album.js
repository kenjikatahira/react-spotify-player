import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { getViewRoute } from './../api';

import TracklistHeader from "./../components/tracklistHeader";
import Tracklist from "./../components/tracklist";
import Loading from "../components/loading";
import Grid from "../components/grid";

const Album = ({uri,player,setUri}) => {
    const [data,setData] = useState(null);

    useEffect(() => {
        if(!data) {
            getViewRoute({uri})
                .then(setData);
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
