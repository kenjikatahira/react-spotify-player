import React from 'react';
import { connect } from 'react-redux';
import SpotifyLogin from 'react-spotify-login';

import { setSession,logout } from './../../auth';

import { clientId, redirectUri } from './../../config';

import { getUser } from './../../actions';

class Login extends React.Component {
    onSuccess(response) {
        setSession(response);
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
                <button onClick={this.logout}>LOGOUT</button>
                <div className="login">
                <SpotifyLogin
                    clientId={clientId}
                    redirectUri={redirectUri}
                    onSuccess={(d) => { this.onSuccess(d) }}
                    onFailure={this.onFailure}
                />
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

export default connect(mapStateToProps, { getUser })(Login);
