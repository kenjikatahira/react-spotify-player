import React from 'react';

const Search = ({onSearchChange}) => {
    return (
        <div className="search">
            <input type="text" onChange={onSearchChange} placeholder="Search" />
        </div>
    )
}

export default Search;
