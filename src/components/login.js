import React from 'react';
import SpotifyLogin from 'react-spotify-login';
import styled from 'styled-components';
import { redirectUri } from '../config';
import { scope } from '../api/spotify';

const StyledLogin = styled.div`
    @font-face {
        font-family: 'Cooper Black';
        src: url(${process.env.PUBLIC_URL}/assets/cooper_black.ttf);
    }
    position:relative;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    font-family: "Cooper Black";
    background: rgba(28,28,28);
    color: #fff;
    overflow: none;
    margin:0 auto;
    width:100%;
    height: 100vh;
    text-align: center;
    background-position: center center;

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

    footer {
        position: absolute;
        bottom: 10px;
        right: 15px;
        font-family: 'helvetica';
        font-size: 11px;
        opacity: 0.7;
        a {
            color :#fff;
        }
    }
`
class Login extends React.Component {
    onSuccess(response) {
        this.props.onLogin(response);
    }
    onFailure(err) {
        throw new Error(err);
    }
    render() {
        return (
            <StyledLogin className="login" style={{backgroundImage : `url('${process.env.PUBLIC_URL}/assets/unsplash.jpg')`, backgroundSize : 'cover'}}>
                <div className="login-button container">
                    <SpotifyLogin
                        className="btn"
                        clientId={process.env.REACT_APP_SPOTIFY_CLIEND_ID}
                        redirectUri={redirectUri}
                        onSuccess={(response) => { this.onSuccess(response) }}
                        onFailure={this.onFailure}
                        scope={scope}
                    />
                </div>
                <footer>
                    <span>Photo by <a href="https://unsplash.com/@simonweisser?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener noreferrer">Simon Weisser</a> on <a href="https://unsplash.com/s/photos/music?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener noreferrer">Unsplash</a></span>
                </footer>
            </StyledLogin>
        )
    }
}

export default Login
