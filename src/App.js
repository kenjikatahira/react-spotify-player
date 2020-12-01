import React from 'react';
import { connect } from 'react-redux';

import './style.scss';

import { isLogged } from './actions';

import Main from './components/main';

class App extends React.Component {
    componentDidMount() {
        this.props.isLogged();
    }
    render() {
        return (
            <div className="app">
                <Main></Main>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        logged : state.logged
    };
}

export default connect(mapStateToProps, { isLogged })(App);
