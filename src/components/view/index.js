import React from "react";

import TrackList from "../tracklist";

class View extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { current } = this.props;
        console.log(current.view);
        const [image] = ((current.view || {}).images || []);
        return (
            <>
                <div style={{backgroundImage : `url(${(image || {}).url})`, height: 500 , backgroundSize : 'initial', backgroundPosition: 'center',backgroundRepeat: 'no-repeat' }}>
                    <h2>{(current.view || {}).name}</h2>
                    <p>{((current.view || {}).owner || {}).display_name}</p>
                </div>
                <TrackList list={current || {}} />
            </>
        );
    }
}

export default View;
