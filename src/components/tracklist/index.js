import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getPlayer } from "../../actions";

const StyledList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 10px;

    .track {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 14px;
        border-top: 1px solid rgba(133, 133, 133, 0.3);
        width: 90%;
        margin: 0 auto;
        &:last-child {
            border-bottom: 1px solid rgba(133, 133, 133, 0.3);
        }
        .name span {
            padding-left: 15px;
            display: inline-block;
            margin-bottom: 0;
        }
    }
`;
class Tracklist extends React.Component {
    UNSAFE_componentWillUpdate(nextProps) {
        if (
            ((nextProps.player || {}).tracks || []).length &&
            ((this.props.player || {}).tracks || []).length &&
            this.props.view !== nextProps.view
            ) {
            this.props.getPlayer({ uri: nextProps.view });
        }
    }
    componentWillMount() {
        this.props.getPlayer({ uri: this.props.view });
    }
    setTrackDuration(duration) {
        const minutes = Math.floor(duration / 60000);
        const seconds = ((duration % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }
    renderList(item) {
        return (
            <li className="track" key={item.id} onClick={() => {
                this.props.player.play({
                    uri : item.uri,
                    uris : this.props.player.tracks.map(i=>i.uri),
                    device_id : this.props.device_id
                })
            }}>
                <div className="name">
                    <i className="fas fa-play"></i>
                    <span>{item.name}</span>
                </div>
                <div className="duration">
                    <span>{this.setTrackDuration(item.duration_ms)}</span>
                </div>
            </li>
        );
    }
    render() {
        const { tracks } = this.props.player;
        if (tracks) {
            return (
                <>
                    <StyledList>
                        {tracks.map((i) => this.renderList(i))}
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
        view: state.view,
        player: state.player,
        device_id: state.device_id,
    };
};

export default connect(mapStateToProps, {
    getPlayer,
})(Tracklist);
