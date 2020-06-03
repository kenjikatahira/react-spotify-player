import { combineReducers } from 'redux';

const GET_USER = 'GET_USER';

const userReducer = (state=[],action) => {
    if(action.type === GET_USER) {
        return action.payload;
    }
    return state;
}

export default combineReducers({
    user : userReducer
});
