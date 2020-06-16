import React from 'react';
import { connect } from 'react-redux';
import Player from '../../player';
import { update,logout,getAll } from '../../actions';

import Login from '../login';
import delay from 'delay';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initiated : false,
            avatar : { opened : false }
        }
    }
    async componentDidMount() {
        // spotify player
        await delay(1000);

        if(window.Spotify) {
            this.props.getAll();
        }
    }
    render() {
        (Object.values(this.props.data).length !== 0 && (this.props.logged || {}).status && !this.state.initiated) && Player.init(this.props.data.currentTrack);
        if((this.props.logged || {}).status) {
            return (
                <>
                    <main>
                        <footer>
                            <button className="btn btn-outline-secondary" onClick={() => Player.previous(this.props.update)}><i className="fas fa-backward"></i></button>
                            <button className="btn btn-outline-secondary" onClick={() => Player.play(this.props.update)}><i className="fas fa-play"></i></button>
                            <button className="btn btn-outline-secondary" onClick={() => Player.pause(this.props.update)}><i className="fas fa-pause"></i></button>
                            <button className="btn btn-outline-secondary" onClick={() => Player.next(this.props.update)}><i className="fas fa-forward"></i></button>
                            <button className="btn btn-outline-secondary" onClick={() => this.props.logout()}>logout</button>
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

export default connect(mapStateToProps, { update,logout,getAll })(Index);
