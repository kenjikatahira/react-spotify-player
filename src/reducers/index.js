import { combineReducers } from 'redux';

const GET_COUNTRIES = 'GET_COUNTRIES';

const countriesReducer = (state=[],action) => {
    if(action.type === GET_COUNTRIES) {
        return action.payload;
    }
    return state;
}

export default combineReducers({
    countries : countriesReducer
});
