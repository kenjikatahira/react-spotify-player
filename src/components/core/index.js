import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import { isLogged,getUser } from './../../actions';

// components ....
import Login from '../login';
import Index from '../index';

class Core extends React.Component {
    componentDidMount() {
        this.props.isLogged();
    }
    render() {
        if(this.props.logged === true){
            // request dos dados
            this.props.getUser();
        } else {
            // redireciona para o login
        };
        return (
            <Router>
                <div>
                    <div className="menu">
                        <ul>
                            <li><Link to="/">index</Link></li>
                            <li><Link to="/login">login</Link></li>
                        </ul>
                    </div>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/" component={Index} />
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

export default connect(mapStateToProps, { isLogged,getUser })(Core);
