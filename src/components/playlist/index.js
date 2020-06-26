import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getPlayer, setView } from "../../actions";
import TracklistHeader from "../tracklist-header";
import Tracklist from "../tracklist";

const StyledList = styled.div`
    padding: 20px 0;
    .container {
        margin-left: 20px;
    }
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
`;

class Playlist extends React.Component {
    componentWillMount() {
        this.props.getPlayer({ uri: this.props.uri });
    }
    UNSAFE_componentWillUpdate(nextProps) {
        if (
            ((nextProps.player || {}).tracks || []).length &&
            ((this.props.player || {}).tracks || []).length &&
            this.props.uri !== nextProps.uri
        ) {
            this.props.getPlayer({ uri: nextProps.uri });
        }
    }
    render() {
        const { tracks } = this.props.player;
        if (tracks) {
            return (
                <>
                    <StyledList>
                        <div className="container">
                            <TracklistHeader props={this.props.player} />
                            {/* <div className="filter">
                                <input type="text" placeholder="filter" />
                            </div> */}
                            <Tracklist player={this.props.player} device_id={this.props.device_id} />
                        </div>
                    </StyledList>
                </>
            );
        } else {
            return <>loading</>;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        uri: state.uri,
        player: state.player,
        device_id: state.device_id
    };
};

export default connect(mapStateToProps, {
    getPlayer,
    setView,
})(Playlist);
