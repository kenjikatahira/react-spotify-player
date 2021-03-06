import React, { useContext, useEffect, useState } from "react";
import Styled from 'styled-components';

import { fetchSearchTerm } from '../api';
import Grid from "../components/grid";
import { SpotifyContext } from "../components/main";

import Loading from "./../components/loading";

const StyledSearch = Styled.div`
`

const Search = () => {
    const { searchTerm, setUri, uri, player } = useContext(SpotifyContext);
    const [data,setData] = useState(null);
    useEffect(() => {
        if(searchTerm && searchTerm !== '') {
            fetchSearchTerm({searchTerm}).then(data => {
                setData(data);
            });
        }
    },[searchTerm]);

    // reseta o data
    useEffect(() => {
        setData(null);
    },[uri])

    if (data) {
        return (
            <StyledSearch className="search">
                <Grid grid={(data || {}).grid} player={player} setUri={setUri} />
            </StyledSearch>
        );
    } else {
        return (
            <Loading />
        );
    }
}

export default Search;
