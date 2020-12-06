import React from "react";
import { connect } from "react-redux";

import {
    setView,
    getSavedTracks
} from "../actions";

import Grid from "../components/grid";
import Loading from "../components/loading";

class SavedTracks extends React.Component {
    componentDidMount() {
        this.props.getSavedTracks();
    }

    componentDidUpdate(nextProps) {
        if (
            ((nextProps.view || {}).grid) &&
            ((this.props.view || {}).grid) &&
            this.props.uri !== nextProps.uri
        ) {
            this.props.getView({ uri: nextProps.uri });
        }
    }

    render() {
        if((this.props.view || {}).grid) {
            return (
                <div className="saved-tracks">
                    <Grid grid={this.props.view.grid} />
                </div>
            )
        } else {
            return (
                <Loading />
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        view: state.view,
        player: state.player
    };
};

export default connect(mapStateToProps, {
    setView,
    getSavedTracks
})(SavedTracks);
