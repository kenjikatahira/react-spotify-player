import React from "react";
import { connect } from "react-redux";

import './style.scss';

import { getView, setView } from "../../actions";

import TracklistHeader from "../tracklist-header";
import Tracklist from "../tracklist";

class Playlist extends React.Component {

    componentWillMount() {
        this.props.getView({
            uri: this.props.uri
        });
    }

    UNSAFE_componentWillUpdate(nextProps) {
        if (
            ((nextProps.view || {}).tracks || []).length &&
            ((this.props.view || {}).tracks || []).length &&
            this.props.uri !== nextProps.uri
        ) {
            this.props.getView({ uri: nextProps.uri });
        }
    }

    render() {
        const { tracks } = this.props.view;
        const {
            view,
            device_id
        } = this.props;

        if (tracks) {
            return (
                <div className="playlist">
                    <div className="container">
                        <TracklistHeader
                            props={view}
                        />
                        <Tracklist
                            view={view}
                            device_id={device_id}
                        />
                    </div>
                </div>
            );
        } else {
            return <>loading</>;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        uri: state.uri,
        view: state.view,
        device_id: state.device_id
    };
};

export default connect(mapStateToProps, {
    getView,
    setView,
})(Playlist);
