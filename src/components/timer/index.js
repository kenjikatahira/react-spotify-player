import React from 'react';
import Styled from 'styled-components';

import {formatTrackDuration} from './../../utils';

const StyledTimer = Styled.div`
    text-align: center;
    font-size: 13px;
`

const Timer = ({count,fixed}) => {
    return (
        <StyledTimer className="timer">
            {formatTrackDuration(fixed ? fixed : count)}
        </StyledTimer>
    )
}

export default Timer;
