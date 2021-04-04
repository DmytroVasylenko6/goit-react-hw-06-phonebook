import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import * as actions from './contacts-actions';


const itemsReducer = createReducer([], {
    [actions.contactsParse]: (state, {payload}) => [...state, ...payload],
    [actions.contactAdd]: (state, {payload}) => [...state, payload],
    [actions.contactDelete]: (state, {payload}) => state.filter(contact => contact.id !== payload),
})


const filterReducer = createReducer('', {
    [actions.contactFilter]: (_, { payload }) => payload,
});


const contactsReducer = combineReducers({
    items: itemsReducer,
    filter: filterReducer
});

export default contactsReducer;