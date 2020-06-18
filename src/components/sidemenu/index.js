import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { get_playlist_items } from '../../actions';

const StyledList = styled.ul`
    font-size:16px;
    padding: 15px;
    list-style: none;
    h2 {
        font-size: 20px;
        color : #FF6699;
        font-weight: bold;
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
                    <StyledList className="sidemenu col-sm-2">
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
