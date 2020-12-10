import React, { useState, useEffect } from "react";

import { getViewRoute } from './../api';

import TracklistHeader from "./../components/tracklistHeader";
import Tracklist from "./../components/tracklist";
import Loading from "../components/loading";

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
        const {table,header,label,releaseDate} = data;
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
            </div>
        );
    } else {
        return (
            <Loading />
        );
    }
}
export default Album;
