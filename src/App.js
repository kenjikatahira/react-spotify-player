import React from 'react';
import { connect } from 'react-redux';

import { isLogged } from './actions';

import Main from './components/main';

class App extends React.Component {
    componentDidMount() {
        this.props.isLogged();
    }
    render() {
        return (
            <Main></Main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        logged : state.logged
    };
}

export default connect(mapStateToProps, { isLogged })(App);
