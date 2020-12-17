import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Styled from 'styled-components';

import { getViewRoute } from './../api';

// import Loading from "../components/loading";
import Grid from "../components/grid";

const StyledCountries = Styled.div`
    width: 90%;
    margin: 0 auto;
`
const Countries = ({player, setUri}) => {
    const [data,setData] = useState(null);

    useEffect(() => {
        console.log(data)
        if(!data) {
            getViewRoute({uri : 'featured-playlists-countries'})
                .then(setData);
        }
    },[data]);

    return (
        <StyledCountries className="featured-playlists-countries">
            <Grid grid={(data || {}).grid} player={player} setUri={setUri} />
        </StyledCountries>
    )
}

Countries.propTypes = {
    player : PropTypes.object,
    setUri : PropTypes.func
}

export default Countries;
