import React, { useState, useEffect } from "react";
import Styled from 'styled-components';

import { getViewRoute } from './../api';

import TracklistHeader from "./../components/tracklistHeader";
import RelatedArtists from "./../components/relatedArtists";
import Tracklist from "./../components/tracklist";
import Grid from "./../components/grid";
import Loading from "../components/loading";

const StyledArtist = Styled.div`
    padding: 20px 0;
    .container {
        margin-left: 20px;
    }
    .artist-top-related {
        display: grid;
        grid-template-columns: 14vw;
        grid-template-rows: auto;
        grid-template-areas:
          "topTracks topTracks topTracks topTracks topTracks related";
    }
    .tracklist {
        grid-area : topTracks;
        padding: 15px 32px;
    }
    .related-artists {
        grid-area : related;
        padding: 0 5px 24px;
    }
`

const Artist = ({uri, setUri, player}) => {
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
        const { table, header, relatedArtists, grid } = data;
        return (
            <StyledArtist className="artist">
                <TracklistHeader header={header}
                    player={player}
                />
                <div className="artist-top-related">
                    <Tracklist
                        table={table}
                        limit="5"
                        player={player}
                        setUri={setUri}
                    />
                    <RelatedArtists relatedArtists={relatedArtists} setUri={setUri} />
                </div>
                <Grid grid={grid} setUri={setUri} player={player} />
            </StyledArtist>
        );
    } else {
        return (
            <Loading />
        )
    }
}

export default Artist;
