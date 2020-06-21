import React from "react";
import Home from "../home";
import TrackList from "../tracklist";

class View extends React.Component {
    render() {
        const { view,device_id } = this.props;
        return (
            <>
                {this.props.view.indexOf('album') >= 0 ? (
                    'album'
                ) : this.props.view.indexOf('artist') >= 0 ? (
                    <TrackList view={view} />
                ) : this.props.view.indexOf('home') >= 0 ? (
                    <Home />
                ) : (
                    <TrackList />
                )}
            </>
        );
    }
}

export default View;
