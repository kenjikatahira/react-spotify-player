import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// actions
import {getCountries} from './../../actions';

// components ....
import List from '../list';

class Core extends React.Component {
    componentDidMount() {
        this.props.getCountries();
    }
    render() {
        console.log(this.props.countries)
        return (
            <Router>
                <div className="ui container">
                    <h2>react-redux-router-starter</h2>
                    <div className="menu">
                        <ul>
                            <li><Link to="/">index</Link></li>
                            <li><Link to="/list">list</Link></li>
                        </ul>
                    </div>
                    <Switch>
                        <Route exact path="/" component={() => (<div>index</div>)} />
                        <Route exact path="/list" component={List} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        countries : state.countries
    };
}

export default connect(mapStateToProps,{ getCountries })(Core);
