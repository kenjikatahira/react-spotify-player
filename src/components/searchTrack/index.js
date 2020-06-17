import React from 'react';

const searchTrack = () => {
    const onChange = (ev) => {
        // console.log(ev.target.value)
    }
    return (
        <>
            <div className="active-pink-4 mb-4">
                <input className="form-control" onChange={onChange} type="text" placeholder="Search" aria-label="Search" />
            </div>
        </>
    )
}

export default searchTrack;
