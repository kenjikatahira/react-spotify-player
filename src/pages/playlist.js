import React from "react";
import Styled from 'styled-components';

// import Tracklist from "./../components/tracklist";

const StyledPlaylist = Styled.div`
`

const Playlist = () => {


    if ((this.props.view || {}).table) {
        return (
            <StyledPlaylist className="playlist">
                {/* <TracklistHeader
                    header={this.props.view.header}
                /> */}
                {/* <Tracklist
                    table={this.props.view.table}
                /> */}
            </StyledPlaylist>
        );
    } else {
        return (
            <div>loading...</div>
        );
    }
}

export default Playlist;
