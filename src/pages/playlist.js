import React, {useState,useEffect} from "react";
import Styled from 'styled-components';
import PropTypes from 'prop-types';

import { getViewRoute } from './../api';

import Loading from "./../components/loading";
import Tracklist from "./../components/tracklist";
import TracklistHeader from './../components/tracklistHeader';

const StyledPlaylist = Styled.div`
`

const Playlist = ({uri,setUri,player,setTopBar,currentTrack}) => {
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
        const { table, header } = data;
        return (
            <StyledPlaylist className="playlist">
                <TracklistHeader
                    player={player}
                    header={header}
                />
                <Tracklist
                    table={table}
                    setUri={setUri}
                    player={player}
                    currentTrack={currentTrack}
                />
            </StyledPlaylist>
        );
    } else {
        return (
            <Loading />
        );
    }
}

Playlist.propTypes = {
    player : PropTypes.object,
    setUri : PropTypes.func,
    uri : PropTypes.string
}

export default Playlist;
