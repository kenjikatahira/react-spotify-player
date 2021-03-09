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
        grid-area: additional-bar;
        height: 0;
        border-bottom: 1px solid #333;
        transition: .3s;
        padding: 10px 21px;
        font-weight: bold;
    }

    &.sticky {
        background:#111;
        animation: mushroom-bottom .4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        .additional-bar {
            opacity: 1;
            background: #111;
            height: auto;

            h2 {
                animation: fade-in .4s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.4s both;
            }
        }
    }

`

const TopBar = ({sticky,title,setUri,onSearch}) => {
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
        <>
        <StyledtopBar className={sticky ? 'top-bar sticky' : 'top-bar'}>
            {renderContent()}
        </StyledtopBar>
        </>
    )
}

TopBar.propTypes = {
    title : PropTypes.string
}

export default TopBar;
