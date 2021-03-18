import React, { useState, useEffect } from "react";
import Styled from 'styled-components';
import { getUser } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledUserWidget = Styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    grid-area : user;

    .avatar {
        margin-right: 10px;
        img,.placeholder {
            border-radius: 50%;
            width: 28px;
            height: 28px;
            background: #212121;
            border: 1px solid #fefefe;

            svg {
                width: 20px;
                height: 20px;
            }
        }
    }

    .user {
        font-size: 15px;
        line-height: 25px;
    }
`

const UserWidget = () => {
    const [data,setData] = useState(null);
    const { images, product, display_name } = data || {};

    const getImage = () => {
        if((data || {}).images.length === 0) {
            return (
                <FontAwesomeIcon icon="user" />
            )
        }

        return <img src={images[0].url} alt="userimage" />
    }

    const setAlert = () => {
        return (
            <div class="alert alert-danger" role="alert">
                You need a premium account to play the songs. =(
            </div>
        )
    }

    useEffect(() => {
        console.log(data)
        if(!data) {
            getUser()
                .then(setData);
        }
    },[data]);

    if(!data) { return <div></div> }
    return (
        <StyledUserWidget className="user-widget">
            {product !== 'premium' && setAlert()}
            <div className="avatar">
                {getImage()}
            </div>
            <div className="user">
                {display_name}
            </div>
        </StyledUserWidget>
    )
}

export default UserWidget;
