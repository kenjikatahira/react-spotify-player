import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { isLogged } from './../../actions';

import './style.css';

// components ....
import Login from '../login';
import Main from '../main/index';

class Core extends React.Component {
    componentDidMount() {
        this.props.isLogged();
    }
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/" component={Main} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        logged : state.logged
    };
}

export default connect(mapStateToProps, { isLogged })(Core);
