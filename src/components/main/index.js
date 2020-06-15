import React from 'react';
import { connect } from 'react-redux';
import { next,previous,play,pause } from '../../spotify';
import { update,logout } from '../../actions';

import Login from '../login';
import List from '../list';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar : { opened : false }
        }
    }
    render() {
        if((this.props.logged || {}).status) {
            // data
            const { user, currentTrack } = this.props.data;
            const playing = ((currentTrack || {}).item || {}).name || false;
            // spotify player
            if(window.Spotify) {
                const player = new window.Spotify.Player({
                    name: 'React Spotify Player',
                    getOAuthToken: cb => { cb(this.props.logged.access_token) }
                });
                player.connect().then(success => success && console.log('Successfully connected to Spotify!'));
            }
            const arrow = () => this.state.avatar.opened ? (<i className="fas fa-angle-up"></i>) : (<i className="fas fa-angle-down"></i>);
            return (
                <>
                    <main>
                        <div className="nav primary">
                            <div className="nav-item avatar">
                                <div className="icon" onClick={() => { this.setState({ avatar : { opened : !this.state.avatar.opened }}) }}>
                                    <img src={user && user.images[0].url} />
                                    {arrow()}
                                </div>
                                <div className={this.state.avatar.opened ? 'menu' : 'menu hide'}>
                                    <div>
                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <a className="dropdown-item" href="#">- {(user || {}).display_name} -</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="dropdown-item" href="#" onClick={() => next(this.props.logout)}>logout</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 order-md-2 mb-4">
                            <List currentId={((currentTrack || {}).item || {}).id} list={((currentTrack || {})._album_tracks || {}).items || []} />
                        </div>

                        <p>track : {playing || 'Not playing...'}</p>
                        <p>album : {(((currentTrack || {}).item || {}).album || {}).name || 'Not playing...'}</p>

                        <footer>
                            <button className="btn btn-outline-secondary" onClick={() => previous(this.props.update)}><i className="fas fa-backward"></i></button>
                            <button className="btn btn-outline-secondary" onClick={() => play(this.props.update)}><i className="fas fa-play"></i></button>
                            <button className="btn btn-outline-secondary" onClick={() => pause(this.props.update)}><i className="fas fa-pause"></i></button>
                            <button className="btn btn-outline-secondary" onClick={() => next(this.props.update)}><i className="fas fa-forward"></i></button>
                        </footer>
                    </main>
                </>
            )
        } else {
            return(<Login />)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        data : state.data,
        logged : state.logged
    };
}

export default connect(mapStateToProps, { update,logout })(Index);
