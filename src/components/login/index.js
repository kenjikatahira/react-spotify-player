import React from 'react';
import { connect } from 'react-redux';
import SpotifyLogin from 'react-spotify-login';

import { clientId, redirectUri } from './../../config';

import { getAll, logout, login } from './../../actions';

import { scope } from './../../service/scopes';

class Login extends React.Component {
    onSuccess(response) {
        this.props.login(response);
        this.props.getAll();
    }
    onFailure(err) {
        console.log('fail',err);
    }
    logout() {
        this.props.logout();
    }
    render() {
        return (
            <>
                <div className="login">
                <SpotifyLogin
                    clientId={clientId}
                    redirectUri={redirectUri}
                    onSuccess={(d) => { this.onSuccess(d) }}
                    onFailure={this.onFailure}
                    score={scope}
                />
                <button onClick={() => {this.logout()}}>LOGOUT</button>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data : state.data
    };
}

export default connect(mapStateToProps, { getAll,login,logout })(Login);
