import React from 'react';
import { connect } from 'react-redux';

class Index extends React.Component {
    render() {
        return (
            <>
                <div className="index">
                    <p>user : {this.props.user.display_name}</p>
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

export default connect(mapStateToProps)(Index);
