import React from 'react';
import { connect } from 'react-redux';
import SpotifyLogin from 'react-spotify-login';
import styled from 'styled-components';

import { clientId, redirectUri } from './../../config';
import { logout, login } from './../../actions';
import { scope } from './../../api';

const StyledLogin = styled.div`
    @font-face {
        font-family: 'Cooper Black';
        src: url(${process.env.PUBLIC_URL}/assets/cooper_black.ttf);
    }

    display:flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    font-family: "Cooper Black";
    background: rgba(28,28,28);
    border: 2em solid #ffffff;
    color: #fff;
    overflow: none;
    height: 100vh;
    text-align: center;

    .title {
        padding: 20px;
        font-size: 2em;
        p {
            font-size: 22px;
        }
    }

    .btn {
        border: 1px solid #ffffff;
        font-size: 17px;
        color: #ffffff;
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
            <StyledLogin style={{backgroundImage : `url('${process.env.PUBLIC_URL}/assets/background.jpg')`, backgroundSize : 'cover'}}>
                <div className="login container">
                    <SpotifyLogin
                        className="btn"
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
