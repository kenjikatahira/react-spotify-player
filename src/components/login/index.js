import React from 'react';
import { connect } from 'react-redux';
import SpotifyLogin from 'react-spotify-login';
import styled from 'styled-components';

import { clientId, redirectUri } from './../../config';
import { logout, login } from './../../actions';
import { scope } from './../../api';


const StyledLogin = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background: #18142F;
    form {
        text-align: center;
    }
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
            <>
                <StyledLogin>
                        <div class="button mb-3">
                            <SpotifyLogin
                                className="btn btn-dark"
                                clientId={clientId}
                                redirectUri={redirectUri}
                                onSuccess={(d) => { this.onSuccess(d) }}
                                onFailure={this.onFailure}
                                scope={scope}
                            />
                        </div>
                </StyledLogin>
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
