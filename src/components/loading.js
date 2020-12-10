import React from 'react';
import Styled from 'styled-components';
import LoadingImg from './../assets/loadingImg';

const StyledLoading = Styled.div`
    position: relative;
    display: grid;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 28px;
    height: 92vh;
    img {
        width: 90px;
    }
`

const Loading = () => {
    return (
        <StyledLoading>
            <div className="loading">
                <LoadingImg />
            </div>
        </StyledLoading>
    )
}

export default Loading;
