import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getView, setView } from "../../actions";
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

class Artist extends React.Component {
    componentWillMount() {
        this.props.getView({ uri: this.props.uri });
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
        const { view,device_id } = this.props;
        if (tracks) {
            return (
                <>
                    <StyledList>
                        <div className="container">
                            <TracklistHeader props={view} />
                            <div className="filter">
                                <input type="text" placeholder="filter" />
                            </div>
                            <Tracklist view={view} device_id={device_id} />
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
        view: state.view,
        device_id: state.device_id
    };
};

export default connect(mapStateToProps, {
    getView,
    setView
})(Artist);
