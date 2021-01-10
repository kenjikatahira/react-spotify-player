import React from "react";
import Styled from 'styled-components';

import Loading from "./../components/loading";

const StyledSearch = Styled.div`
`

const Search = () => {

    if (true) {
        return (
            <StyledSearch className="search">
                search
            </StyledSearch>
        );
    } else {
        return (
            <Loading />
        );
    }
}

export default Search;
