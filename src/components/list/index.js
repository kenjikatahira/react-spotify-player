import React from 'react';
import { connect } from 'react-redux';

class List extends React.Component {
    getList(item) {
        return (<div key={item.country}>{item.country}</div>)
    }
    render() {
        return (
            <>
                <div className="list">
                    {this.props.countries.map(this.getList)}
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        countries : state.countries
    };
}

export default connect(mapStateToProps)(List);
