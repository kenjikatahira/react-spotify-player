import React from 'react';
import { connect } from 'react-redux';
import SpotifyLogin from 'react-spotify-login';
import styled from 'styled-components';

import { clientId, redirectUri } from './../../config';
import { logout, login } from './../../actions';
import { scope } from './../../api';

const StyledLogin = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    font-family: "Gotham", sans-serif;
    background: rgba(28,28,28);
    padding: 0;
    color: #fff;
    overflow: none;
    height: 100vh;
    text-align: center;
`

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
            <StyledLogin>
                <div className="login container">
                    <SpotifyLogin
                        className="btn btn-light"
                        clientId={clientId}
                        redirectUri={redirectUri}
                        onSuccess={(response) => { this.onSuccess(response) }}
                        onFailure={this.onFailure}
                        scope={scope}
                    />
                </div>
            </StyledLogin>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.user
    };
}

export default connect(mapStateToProps, { login,logout })(Login);
