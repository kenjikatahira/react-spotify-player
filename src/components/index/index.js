import React from 'react';
import { connect } from 'react-redux';

class Index extends React.Component {
    render() {
        const { user, currentTrack } = this.props.data;
        return (
            <>
                <div className="index">
                    <p>user : {(user || {}).display_name}</p>
                    <p>playing : {((currentTrack || {}).item || {}).name}</p>
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

export default connect(mapStateToProps)(Index);
