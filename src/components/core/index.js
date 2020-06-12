import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

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
        if(this.props.logged === true){
            // request dos dados
            this.props.getAll();
        } else {
            // redireciona para o login
        };
        console.log('---->>>>>',this.props.data)
        return (
            <Router>
                <div>
                    <div className="menu">
                        <ul>
                            <li><Link to="/">index</Link></li>
                            <li><Link to="/login">login</Link></li>
                            <p>
                                <code>status : {this.props.logged ? 'logged' : 'not logged'}</code>
                            </p>
                            <p>
                                <code> track progress :{((this.props.data || {}).currentTrack || {}).progress_ms}</code>
                            </p>
                        </ul>
                    </div>
                    <div>
                    </div>
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
