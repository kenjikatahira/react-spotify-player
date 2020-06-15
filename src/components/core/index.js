import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { isLogged,getAll } from './../../actions';

import './style.css';

// components ....
import Login from '../login';
import Main from '../main/index';

class Core extends React.Component {
    componentDidMount() {
        this.props.isLogged();
    }
    render() {
        if(Object.values(this.props.data).length === 0 && (this.props.logged || {}).status) {
            this.props.getAll();
        }
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
        data : state.data,
        logged : state.logged
    };
}

export default connect(mapStateToProps, { isLogged,getAll })(Core);
