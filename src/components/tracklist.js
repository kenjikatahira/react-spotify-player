import React,{ useState } from "react";
import Styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types';

const StyledTracklist = Styled.div`
    padding: 0 32px 24px;
    .filter {
        padding: 3px;
        input {
            width: 176px;
            height: 25px;
            border-radius: 27px;
            background: inherit;
            border-style: none;
            color: #f5f5f5;
        }
    }
    .toggleShow {
        padding: 16px;
        background: none;
        border: none;
        color: hsla(0,0%,100%,.7);
    }
    .copyright {
        margin: 15px 0;
        color: #aaa;
    }
    table {
        list-style: none;
        margin: 0;
        padding: 10px;
        color: #f5f5f5;

        th {
            color: #d1d1d1;
            font-size: 12px;
            text-transform: uppercase;
            border-top: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            &:fist-child {
                width: 30px;
            }
        }

        tr {
            &:not(.header):hover td {
                background: rgba(255, 255, 255, 0.1);
            }
        }

        td {
            font-size: 13px;
            &:nth-child(1) {
                width: 20px;
            }
            &:last-child {
                width: 80px;
                text-align: center;
            }
        }

        tr,
        td {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            cursor: pointer;
            padding: 8px;
            white-space: nowrap;
            max-width: 220px;
            overflow: hidden;

            &:hover {
                .action {
                    visibility: visible;
                }
            }

            .action {
                border: 1px solid #fff;
                padding: 5px;
                width: 20px;
                height: 20px;
                border-radius: 100%;
                visibility: hidden;

                &.selected {
                    visibility: visible;
                }
            }

            span.link:hover {
                border-bottom: 1px solid #fff;
            }
        }
    }
`

const Tracklist = ({table,player,limit : hasLimit,setUri, copyright,currentTrack}) => {
    const [limit,setLimit] = useState(hasLimit || null);
    const [filteredItems,setFilteredItems] = useState([]);

    const setArtist = ({ artist, total, index }) => {
        const { id, uri, name } = artist;
        return (
            <span
                key={id+'#'+index}
                onClick={(ev) => {
                    ev.stopPropagation();
                    setUri(uri);
                }}
            >
                {total > 1 && index !== total - 1 ? `${name}, ` : name}
            </span>
        );
    }

    const setAlbum = (ev,item) => {
        ev.stopPropagation();
        setUri(item.album.uri);
    }

    const renderIcon = (uri='') => {
        if(uri === (currentTrack || {}).uri) {
            return <FontAwesomeIcon className="action selected" icon="pause" />
        } else{
            return <FontAwesomeIcon className="action" icon="play" />
        }
    }

    const renderList = (item,index) => {
        return (
            <tr
                key={item.id+'#'+index}
                onClick={() => {
                    player.play({
                        uri: item.uri,
                        uris: table.body
                    });
                }}
            >
                <td>
                    <span>{renderIcon(item.uri)}</span>
                </td>
                {
                    item.name &&
                    <td>
                        <span>{item.name}</span>
                    </td>
                }
                {
                    item.artists &&
                    <td>
                        <span className="link">{item.artists && Object.values(item.artists).map((artist, index) => setArtist({ artist,total: (item.artists || []).length, index }))}</span>
                    </td>
                }
                {
                    item.album &&
                    <td>
                        <span className="link" onClick={(ev) => setAlbum(ev,item)}> {item.album.name} </span>
                    </td>
                }
                {
                item.duration_ms &&
                <td>
                    <span> {item.duration_ms} </span>
                </td>
                }
            </tr>
        );
    }

    const onFilter = (ev) => {
        setFilteredItems(table.body.filter(({name}) => name.toLowerCase().replace('ã','a').indexOf(ev.target.value.toLowerCase()) > -1 ))
    }

    const showMore = () =>{
        setLimit(+limit === 5 ? 10 : 5);
    }

    return (
        <StyledTracklist className="tracklist">
            <div className="filter">
                <input type="text" placeholder="Filter" onChange={(ev) => { onFilter(ev) }} />
            </div>
            <table className="table">
                <thead>
                    <tr className="header">
                        <th scope="col"></th>
                        {table.head.map(i => (<th key={i}>{i}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {((filteredItems || []).length > 0 ? filteredItems : table.body).map((i,index) => {
                        if((limit)) {
                            return (index < +limit) && renderList(i,index);
                        } else {
                            return renderList(i,index);
                        }
                    })}
                </tbody>
            </table>
            { limit && <button className="toggleShow" onClick={showMore}>show {+limit === 5 ? 'more' : 'less' }</button>}
            { copyright && <div className="copyright">{copyright}</div>}
        </StyledTracklist>
    );
}

Tracklist.propTypes = {
    table : PropTypes.object,
    limit : PropTypes.string,
    setUri : PropTypes.func,
    copyright : PropTypes.string,
    currentTrack : PropTypes.object
}

export default Tracklist;
