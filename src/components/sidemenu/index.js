import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { get_playlist_items } from '../../actions';

const StyledList = styled.ul`
    font-size:16px;
    list-style: none;
    overflow: hidden;
    white-space: nowrap;
    margin:0;
    padding:30px;
    h2 {
        font-size: 20px;
        color : #FF6699;
        font-weight: bold;
    }
    li {
        cursor: pointer;

        &:hover {
            color: #ddd;
            background: rgba(255,255,255,.1);
        }
    }
`

class SideMenu extends React.Component {
    constructor(props) {
        super(props);
    }
    renderList(item) {
        return (
            <li key={item.id} onClick={() => { this.props.get_playlist_items(item) }}>{item.name}</li>
        )
    }
    render() {
        const { playlists } = this.props;
        if((playlists || {}).items) {
            return (
                <>
                    <StyledList className="sidemenu">
                        <h2>your library</h2>
                        {playlists.items.map((item => this.renderList(item)))}
                    </StyledList>
                </>
            )
        } else {
            return (
                <>
                    <div className="sidemenu col-sm-2">
                        loading
                    </div>
                </>
            )
        }
    }
}


const mapStateToProps = (state) => {
    return {
        playlists : state.playlists
    };
}

export default connect(mapStateToProps, { get_playlist_items })(SideMenu);
