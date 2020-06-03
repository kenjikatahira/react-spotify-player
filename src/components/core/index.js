import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';


import { isAuthenticated } from './../../auth';

// actions
import {getUser} from './../../actions';

// components ....
import Login from '../login';

class Core extends React.Component {
    componentDidMount() {
        if(isAuthenticated()){
            this.props.getUser();
        };
    }
    render() {
        return (
            <Router>
                <div className="ui container">
                    <h2>Player</h2>
                    <h1>{this.props.user.country}</h1>

                    <div className="menu">
                        <ul>
                            <li><Link to="/">index</Link></li>
                            <li><Link to="/login">login</Link></li>
                        </ul>
                    </div>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/" component={() => (<div>index</div>)} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.user
    };
}

export default connect(mapStateToProps,{ getUser })(Core);
