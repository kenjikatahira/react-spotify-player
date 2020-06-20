import React from "react";
import styled from 'styled-components';
import TrackList from "../tracklist";

const StyledView = styled.div`

    display: flex;
    align-content: center;
    align-items : center;
    width: 100%;
    height: 400px;

    margin:0 56px;

    .artwork {
        background-size: cover;
        background-position: center;
        width: 300px;
        height: 300px;
    }

`

class View extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { current,device_id } = this.props;
        const { artist } = current;
        const [image] = ((current.view || {}).images || []);
        return (
            <>
                <StyledView>
                    <div className="artwork" style={{ backgroundImage : `url(${(image || {}).url})` }}></div>
                    <div className="info">
                        <h2>{(artist || {}).name}</h2>
                        <h2>{(current.view || {}).name}</h2>
                        <p>{((current.view || {}).owner || {}).display_name}</p>
                        <p>{(current.view || {}).release_date} * {(current.view || {}).total_tracks}</p>
                    </div>
                </StyledView>
                <TrackList device_id={device_id} current={current || {}} />
            </>
        );
    }
}

export default View;
