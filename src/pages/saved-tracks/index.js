import React from "react";
import { connect } from "react-redux";

import './style.scss';

import {
    getSavedTracks,
    setView
} from "../../actions";

import Grid from "../../components/grid";
import Loading from "../../components/loading";

class SavedTracks extends React.Component {
    componentDidMount() {
        this.props.getSavedTracks();
    }

    render() {
        if(Object.keys(this.props.grid).length) {
            return (
                <Grid grid={this.props.grid} />
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
        grid: state.grid,
        player: state.player,
        device_id : state.device_id
    };
};

export default connect(mapStateToProps, {
    getSavedTracks,
    setView
})(SavedTracks);
