import React, { useState, useEffect } from "react";
import Styled from 'styled-components';
import { getUser } from '../api';

const StyledUserWidget = Styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    grid-area : user;

    .avatar {
        margin-right: 10px;
        img {
            border-radius: 50%;
            width: 28px;
        }
    }

    .user {
        font-size: 15px;
        line-height: 25px;
    }
`

const UserWidget = () => {
    const [data,setData] = useState(null);
    const getImage = () => {
        if(data.images.length) {
            return <img src={data.images[0].url} alt="userimage" />
        } else {
            return ''
        }
    }

    const setAlert = () => {
        return (
            <div class="alert alert-danger" role="alert">
                You need a premium account to play the songs. =(
            </div>
        )
    }

    useEffect(() => {
        if(!data) {
            getUser()
                .then(setData);
        }
    },[data]);

    if(!data) { return <div></div> }
    return (
        <StyledUserWidget className="user-widget">
            {data.product !== 'premium' && setAlert()}
            <div className="avatar">
                {getImage()}
            </div>
            <div className="user">
                {data.display_name}
            </div>
        </StyledUserWidget>
    )
}

export default UserWidget;
