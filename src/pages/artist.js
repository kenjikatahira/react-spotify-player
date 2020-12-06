import React from "react";
import { connect } from "react-redux";
import Styled from 'styled-components';

import {
    getView,
    setView
} from "./../actions";

import TracklistHeader from "../components/tracklist-header";
import RelatedArtists from "../components/relatedArtists";
import Tracklist from "../components/tracklist";
import Loading from "../components/loading";
import Grid from "../components/grid";

const StyledArtist = Styled.div`
    padding: 20px 0;
    .container {
        margin-left: 20px;
    }
    .artist-top-related {
        display: grid;
        grid-template-columns: 14vw;
        grid-template-rows: auto;
        grid-template-areas:
          "topTracks topTracks topTracks topTracks topTracks related";
    }
    .tracklist {
        grid-area : topTracks;
        padding: 15px 32px;
    }
    .related-artists {
        grid-area : related;
        padding: 0 5px 24px;
    }
`

class Artist extends React.Component {
    componentWillMount() {
        this.props.getView({ uri: this.props.uri });
    }

    componentDidUpdate(nextProps) {
        if (
            ((nextProps.view || {}).table) &&
            ((this.props.view || {}).table) &&
            this.props.uri !== nextProps.uri
        ) {
            this.props.getView({ uri: nextProps.uri });
        }
    }

    render() {
        if ((this.props.view || {}).table) {
            return (
                <StyledArtist className="artist">
                    <TracklistHeader header={this.props.view.header} />
                    <div className="artist-top-related">
                        <Tracklist table={this.props.view.table} limit="5" />
                        <RelatedArtists relatedArtists={this.props.view.relatedArtists} />
                    </div>
                    <Grid grid={this.props.view.grid} />
                </StyledArtist>
            );
        } else {
            return (
                <Loading />
            )
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
    setView
})(Artist);
