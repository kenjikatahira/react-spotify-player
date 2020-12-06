import React from "react";
import { connect } from "react-redux";
import Styled from 'styled-components';

import {
    getHome,
    setView
} from "./../actions";

import Loading from "../components/loading";
import Grid from "../components/grid";

const StyledHome = Styled.div`

`

class Main extends React.Component {

    componentDidMount() {
        this.props.getHome();
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
        if((this.props.view || {}).grid) {
            return (
                <StyledHome className="home">
                    <Grid grid={this.props.view.grid} />
                </StyledHome>
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
    getHome,
    setView
})(Main);
