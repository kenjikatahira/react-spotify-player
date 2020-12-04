import React from 'react';

const RelatedArtists = ({view}) => {
    const {
        relatedArtists
    } = view;

    const renderArtist = (artist) => {
        return (
            <li key={artist.id}>
                {artist.name}
            </li>
        )
    }

    return (
        <div className="related-artists">
            <ul>
                {relatedArtists.artists.map(renderArtist)}
            </ul>
        </div>
    )
}

export default RelatedArtists;
