import React from 'react';
import { connect } from 'react-redux';
import SpotifyLogin from 'react-spotify-login';

import { clientId, redirectUri } from './../../config';

import { getUser, logout, login } from './../../actions';

class Login extends React.Component {
    onSuccess(response) {
        this.props.login(response);
        this.props.getUser();
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

export default connect(mapStateToProps, { getUser,login,logout })(Login);
