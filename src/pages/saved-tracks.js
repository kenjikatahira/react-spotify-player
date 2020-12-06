import React from "react";
import { connect } from "react-redux";

import {
    getSavedTracks,
    setView
} from "../actions";

import Grid from "../components/grid";
import Loading from "../components/loading";

class SavedTracks extends React.Component {
    componentDidMount() {
        this.props.getSavedTracks();
    }

    render() {
        if(Object.keys(this.props.view).length) {
            return (
                <Grid view={this.props.view} />
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
        view: state.view,
        player: state.player,
        device_id : state.device_id
    };
};

export default connect(mapStateToProps, {
    getSavedTracks,
    setView
})(SavedTracks);
