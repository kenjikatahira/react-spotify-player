import React from "react";
import { connect } from "react-redux";
import Styled from 'styled-components';

const StyledPlaylist = Styled.div`
    .filter {
        padding: 3px;
        input {
            width: 176px;
            height: 25px;
            border-radius: 27px;
            background: inherit;
            border-style: none;
            color: #f5f5f5;
        }
    }
`

import { getView, setView } from "../../actions";

import TracklistHeader from "../tracklist-header";
import Tracklist from "../tracklist";
import Tracklist from "../loading";

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
            view
        } = this.props;

        if (tracks) {
            return (
                <StyledPlaylist className="playlist">
                    <TracklistHeader
                        props={view}
                    />
                    <Tracklist
                        view={view}
                    />
                </StyledPlaylist>
            );
        } else {
            return <Loading />
        }
    }
}

const mapStateToProps = (state) => {
    return {
        uri: state.uri,
        view: state.view
    };
};

export default connect(mapStateToProps, {
    getView,
    setView,
})(Playlist);
