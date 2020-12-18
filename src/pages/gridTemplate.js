import React, { useEffect, useState, useContext, useRef } from "react";
import Styled from 'styled-components';

import { getViewRoute } from '../api';
import { SpotifyContext } from "../components/main";

// import Loading from "../components/loading";
import Grid from "../components/grid";

const StyledGridTemplate = Styled.div`
    width: 90%;
    margin: 0 auto;
`
const GridTemplate = () => {

    const usePrev = (value) => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }
    const {player, setUri, uri} = useContext(SpotifyContext);
    const [data, setData] = useState(null);
    const prevUri = usePrev(uri);

    useEffect(() => {
        if(uri !== prevUri) {
            getViewRoute({uri})
                .then(setData);
        }
    },[uri]);

    return (
        <StyledGridTemplate className={uri}>
            <Grid grid={(data || {}).grid} player={player} setUri={setUri} />
        </StyledGridTemplate>
    )
}
export default GridTemplate;
