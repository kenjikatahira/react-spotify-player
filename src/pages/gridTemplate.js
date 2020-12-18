import React, { useEffect, useState, useContext, useRef } from "react";
import Styled from 'styled-components';
import { getViewRoute } from '../api';
import { SpotifyContext } from "../components/main";

import Pages from '../constants';

// import Loading from "../components/loading";
import Grid from "../components/grid";

const StyledGridTemplate = Styled.div`
    width: 90%;
    margin: 0 auto;
`

const usePrev = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}
const GridTemplate = () => {
    const {player, setUri, uri, setTopBar} = useContext(SpotifyContext);
    const [data, setData] = useState(null);
    const prevUri = usePrev(uri);

    useEffect(() => {
        if(uri !== prevUri) {
            getViewRoute({uri})
                .then(setData);
        } else {
            setTopBar((Pages[uri] || {}).title || uri)
        }
    },[uri,prevUri,setTopBar]);

    return (
        <StyledGridTemplate className={uri}>
            <Grid grid={(data || {}).grid} player={player} setUri={setUri} />
        </StyledGridTemplate>
    )
}
export default GridTemplate;
