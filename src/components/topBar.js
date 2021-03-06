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
        padding: 10px 32px;
        font-weight: bold;
    }

    &.sticky {
        animation: mushroom-bottom .4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        .additional-bar {
            opacity: 1;
            background: rgba(0,0,0,1);
            height: 70px;

            h2 {
                animation: fade-in .4s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.4s both;
            }
        }
    }

`

const TopBar = ({scroll,title,setUri,onSearch}) => {
    const threshold = 250;

    const search = (e) => {
        e.persist();
        if (e.key === 'Enter') {
            setUri('search');
            onSearch(e.target.value);
            e.target.value = '';
            e.target.blur();
        }
    }

    const throttle = (fn, ms) => {
        let timeout
        function exec() {
            fn.apply()
        }
        function clear() {
            return timeout == undefined ? null : clearTimeout(timeout)
        }
        if(fn !== undefined && ms !== undefined) {
            timeout = setTimeout(exec, ms)
        } else {
            console.error('callback function and the timeout must be supplied')
        }
        // API to clear the timeout
        throttle.clearTimeout = function() {
            clear();
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

    if(scroll >= 300) {
        return (
            <>
            <StyledtopBar className="top-bar sticky" style={{ backgroundColor : 'rgba(0,0,0,' + 100*scroll/threshold + '%)'}}>
                {renderContent()}
            </StyledtopBar>
            </>
        )
    } else {
        return (
            <StyledtopBar className="top-bar" style={{ backgroundColor : 'rgba(0,0,0,' + 100*scroll/threshold + '%)'}}>
                {renderContent()}
            </StyledtopBar>
        )
    }
}

TopBar.propTypes = {
    scroll : PropTypes.number,
    title : PropTypes.string
}

export default TopBar;
