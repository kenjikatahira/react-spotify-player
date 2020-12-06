import React from "react";
import { connect } from "react-redux";

import {
    getView,
    setView
} from "./../actions";

import TracklistHeader from "../components/tracklist-header";
import Tracklist from "../components/tracklist";
import Loading from "../components/loading";

class Album extends React.Component {

    componentWillMount() {
        this.props.getView({
            uri: this.props.uri
        });
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
                <div className="playlist">
                    <TracklistHeader
                        header={this.props.view.header}
                    />
                    <Tracklist
                        table={this.props.view.table}
                    />
                </div>
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
        view: state.view,
        uri : state.uri
    };
};

export default connect(mapStateToProps, {
    getView,
    setView
})(Album);
