import React from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import { isLogged } from './actions';

import Main from './components/main';

const StyledApp = styled.main`
    background: rgba(28,28,28);
`;

class App extends React.Component {
    componentDidMount() {
        this.props.isLogged();
    }
    render() {
        return (
            <StyledApp>
                <Main></Main>
            </StyledApp>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        logged : state.logged
    };
}

export default connect(mapStateToProps, { isLogged })(App);
