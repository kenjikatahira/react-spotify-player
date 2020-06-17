import React from 'react';
import { connect } from 'react-redux';
import SpotifyLogin from 'react-spotify-login';

import { clientId, redirectUri } from './../../config';

import { logout, login } from './../../actions';

import { scope } from './../../api';
class Login extends React.Component {
    onSuccess(response) {
        this.props.login(response);
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
                    scope={scope}
                />
                <button onClick={() => {this.logout()}}>LOGOUT</button>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.user
    };
}

export default connect(mapStateToProps, { login,logout })(Login);
