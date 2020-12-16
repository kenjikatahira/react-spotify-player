import React from "react";
import Styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledRelatedArtists = Styled.div`
    padding: 15px 0;
    ul {
        padding: 0;
        li {
            display: flex;
            flex-direction: row;
            align-items : center;
            list-style:none;
            height: 50px;
            cursor: pointer;
            .image {
                height:30px;
                width: 30px;
                border-radius: 50%;
            }
            .name {
                padding-left: 10px;
            }
        }
    }
`

const RelatedArtists = ({setUri, relatedArtists}) => {
    const renderArtist = (artist) => {
        return (
            <li
                key={artist.id}
                onClick={() => setUri(artist.uri)}
            >
                <div
                    className="image"
                    style={
                        { backgroundImage: `url(${artist.images[2].url})`, backgroundSize :'cover', backgroundPosition:'center center' }
                    }
                >
                </div>
                <div className="name">
                    {artist.name}
                </div>
            </li>
        )
    }
    return (
        <StyledRelatedArtists className="relatedArtists">
            <h4>Fans Also Like</h4>
            <ul>
                {relatedArtists.artists.filter((o,index) => index < 6).map(renderArtist)}
            </ul>
        </StyledRelatedArtists>
    )
}

RelatedArtists.propTypes = {
    setUri : PropTypes.func,
    relatedArtists : PropTypes.object
}

export default RelatedArtists;
