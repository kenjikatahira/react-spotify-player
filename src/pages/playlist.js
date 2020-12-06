import React from "react";
import { connect } from "react-redux";
import Styled from 'styled-components';

import {
    getView,
    setView
} from "./../actions";

import TracklistHeader from "../components/tracklist-header";
import Tracklist from "../components/tracklist";
import Loading from "../components/loading";

const StyledPlaylist = Styled.div`
`

class Playlist extends React.Component {
    componentWillMount() {
        this.props.getView({
            uri: this.props.uri
        });
    }

    componentWillUpdate(nextProps) {
        if (
            (nextProps.view || {}).table &&
            (this.props.view || {}).table &&
            this.props.uri !== nextProps.uri
        ) {
            this.props.getView({ uri: nextProps.uri });
        }
    }

    render() {
        if ((this.props.view || {}).table) {
            return (
                <StyledPlaylist className="playlist">
                    <TracklistHeader
                        header={this.props.view.header}
                    />
                    <Tracklist
                        table={this.props.view.table}
                    />
                </StyledPlaylist>
            );
        } else {
            return (
                <Loading />
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        uri: state.uri,
        view: state.view,
        player: state.player
    };
};

export default connect(mapStateToProps, {
    getView,
    setView,
})(Playlist);
