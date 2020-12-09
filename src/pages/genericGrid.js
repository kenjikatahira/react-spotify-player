import React from "react";
import { connect } from "react-redux";
import Styled from 'styled-components';

import {
    getView,
    setView
} from "./../actions";

import Loading from "../components/loading";
import Grid from "../components/grid";

class GenericGrid extends React.Component {

    componentDidMount() {
        this.props.getView({uri : this.props.uri });
    }

    componentDidUpdate(nextProps) {
        if (
            ((nextProps.view || {}).grid) &&
            ((this.props.view || {}).grid) &&
            this.props.uri !== nextProps.uri
        ) {
            this.props.getView({ uri: nextProps.uri });
        }
    }

    render() {
        if((this.props.view || {}).grid) {
            return (
                <>
                    teste
                    <Grid grid={this.props.view.grid} />
                </>
            )
        } else {
            return (
                <Loading />
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        view: state.view
    };
};

export default connect(mapStateToProps, {
    getView,
    setView
})(GenericGrid);
