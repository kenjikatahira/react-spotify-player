import React from "react";
import Styled from 'styled-components';
import UserWidget from "./userWidget";
import PropTypes from 'prop-types';

const StyledtopBar = Styled.div`
    width:100%;
    height:60px;
    display: grid;
    grid-template-columns: 14vw;
    grid-template-rows: auto;
    grid-template-areas:
      "search . . . user"
      "additional-bar additional-bar additional-bar additional-bar additional-bar";
    position: sticky;
    top: 0;
    align-items: center;
    z-index: 30;

    .search {
        width: 176px;
        height: 24px;
        border-radius: 27px;
        background: inherit;
        border-style: none;
        background-color: #f5f5f5;
        margin: 16px 20px;
        z-index: 999;
    }

    .user-widget {
        padding: 16px 20px;
        z-index: 999;
    }

    .additional-bar {
        width: 100%;
        opacity : 0;
        height: auto;
        grid-area: additional-bar;
        height: 0;
        border-bottom: 1px solid #333;
        transition: .3s;
        padding: 9px 21px;
        font-weight: bold;
        height: auto;
    }

    &.sticky {
        transition: .5s;
        height:120px;
        background: #111;
        .additional-bar {
            height: auto;
            transition: 1s;
            opacity: 1;
        }
    }
`

const TopBar = ({scroll,title,setUri,onSearch}) => {

    const search = (e) => {
        e.persist();
        if (e.key === 'Enter') {
            setUri('search');
            onSearch(e.target.value);
            e.target.value = '';
            e.target.blur();
        }
    }

    const renderContent = () => {
        return (
            <>
                <input onKeyDown={search} className="search" type="search"></input>
                <UserWidget />
                <div className="additional-bar">
                    <h2>{title}</h2>
                </div>
            </>
        )
    }

    return (
        <StyledtopBar className={scroll > 300 ? 'top-bar sticky' : 'top-bar'}>
            {renderContent()}
        </StyledtopBar>
    )
}

TopBar.propTypes = {
    title : PropTypes.string
}

export default TopBar;
