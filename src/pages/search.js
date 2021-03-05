import React, { useContext, useEffect, useState } from "react";
import Styled from 'styled-components';

import { fetchSearchTerm } from '../api';
import { SpotifyContext } from "../components/main";

import Loading from "./../components/loading";

const StyledSearch = Styled.div`
`

const Search = () => {
    const { searchTerm, setUri, uri } = useContext(SpotifyContext);
    const [data,setData] = useState(null);

    useEffect(() => {
        if(!data && searchTerm) {
            fetchSearchTerm({searchTerm})
                .then((data) => console.log(data));
        } else {

        }
    },[data,searchTerm]);

    // reseta o data
    useEffect(() => {
        setData(null);
    },[uri])

    if (true) {
        return (
            <StyledSearch className="search">
                {searchTerm}
            </StyledSearch>
        );
    } else {
        return (
            <Loading />
        );
    }
}

export default Search;
