import { combineReducers } from 'redux';
import actionTypes from './contacts-types';

const itemsReducer = (state = [], { type, payload }) => {
    switch (type) {
        case actionTypes.PARSE_CONTACTS:
            return  [...state, ...payload]
          
        case actionTypes.ADD_CONTACT:
            return [...state, payload]

        case actionTypes.DELETE_CONTACT:
            return state.filter(contact => contact.id !== payload)
        
        default:
           return state
            
    }
};
const filterReducer = (state = '', { type, payload }) => {
    switch (type) {
        case actionTypes.FILTER_CONTACT:
            return payload;
    
     default:
            return state;
    }
};


const contactsReducer = combineReducers({
    items: itemsReducer,
    filter: filterReducer
});

export default contactsReducer;