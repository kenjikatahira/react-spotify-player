import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Styled from 'styled-components';

import { getViewRoute } from './../api';

// import Loading from "../components/loading";
import Grid from "../components/grid";

const StyledRecentlyPlayed = Styled.div`
    width: 90%;
    margin: 0 auto;
`
const RecentlyPlayed = ({player, setUri}) => {
    const [data,setData] = useState(null);

    useEffect(() => {
        if(!data) {
            getViewRoute({uri : 'recently-played'})
                .then(setData);
        }
    },[data]);

    return (
        <StyledRecentlyPlayed className="recently-played">
            <Grid grid={(data || {}).grid} player={player} setUri={setUri} />
        </StyledRecentlyPlayed>
    )
}

RecentlyPlayed.propTypes = {
    player : PropTypes.object,
    setUri : PropTypes.func
}

export default RecentlyPlayed;
