import React from "react";
import { connect } from "react-redux";

import './style.scss';

import { getView, setView } from "../../actions";

import TracklistHeader from "../../components/tracklist-header";
import Tracklist from "../../components/tracklist";
import Loading from "../../components/loading";

class Album extends React.Component {

    componentWillMount() {
        this.props.getView({
            uri: this.props.uri
        });
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
                    <TracklistHeader
                        props={view}
                    />
                    <Tracklist
                        view={view}
                        device_id={device_id}
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
        uri: state.uri,
        view: state.view,
        device_id: state.device_id
    };
};

export default connect(mapStateToProps, {
    getView,
    setView,
})(Album);
