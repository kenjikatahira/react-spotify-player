import React from 'react';

const RelatedArtists = ({relatedArtists}) => {
    console.log(relatedArtists)
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
                {relatedArtists !== undefined && relatedArtists.artists.map(renderArtist)}
            </ul>
        </div>
    )
}

export default RelatedArtists;
