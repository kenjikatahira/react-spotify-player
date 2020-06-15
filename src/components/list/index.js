import React from 'react';

const List = (props) => {
    const renderList = (item) => {
        console.log(item.id,props.currentId, props.currentId === item.id)
        return (
            <li className={item.id === props.currentId ? 'selected' : ''} key={item.id}>
                <div>
                    <small className="text-muted">{item.name}</small>
                </div>
                <span className="text-muted">{item.duration_ms}</span>
            </li>
        )
    }
    return (
        <ul className="list">
            {props.list.map(item => renderList(item))}
        </ul>
    )
}

export default List;
