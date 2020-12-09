import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Styled from 'styled-components';

import { getViewRoute } from './../api';

// import Loading from "../components/loading";
import Grid from "../components/grid";

const StyledHome = Styled.div`

`
const Home = ({player, setUri}) => {
    const [data,setData] = useState(null);

    useEffect(() => {
        if(!data) {
            getViewRoute({uri : 'home'})
                .then(setData);
        }
    },[data]);

    return (
        <StyledHome className="home">
            <Grid grid={(data || {}).grid} player={player} setUri={setUri} />
        </StyledHome>
    )
}

Home.propTypes = {
    player : PropTypes.object,
    setUri : PropTypes.func
}

export default Home;
