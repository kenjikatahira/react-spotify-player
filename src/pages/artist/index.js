import React from "react";
import { connect } from "react-redux";

import './style.scss';

import { getView, setView } from "../../actions";

import TracklistHeader from "../../components/tracklist-header";
import RelatedArtists from "../../components/relatedArtists";
import Tracklist from "../../components/tracklist";
import Loading from "../../components/loading";
import Grid from "../../components/grid";

class Artist extends React.Component {
    componentWillMount() {
        this.props.getView({ uri: this.props.uri });
    }
    componentDidUpdate(nextProps) {
        if (
            ((nextProps.view || {}).tracks || []).length &&
            ((this.props.view || {}).tracks || []).length &&
            this.props.uri !== nextProps.uri
        ) {
            this.props.getView({ uri: nextProps.uri });
        }
    }
    render() {
        const { view, player } = this.props;
        const { tracks } = view;
        if (tracks) {
            return (
                <div className="artist">
                    <TracklistHeader player={player} props={view} />
                    <div className="artist-top-related">
                        <Tracklist view={view} limit="5" />
                        <RelatedArtists view={view} />
                    </div>
                    <Grid grid={view.albums} />
                </div>
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
