import actionTypes from './contacts-types';
import shortid from 'shortid';


export const contactsParse = value => ({
    type: actionTypes.PARSE_CONTACTS,
    payload: value
});

export const contactAdd = ({name, number}) => ({
    type: actionTypes.ADD_CONTACT,
    payload: {
        id: shortid.generate(),
        name: name,
        number: number
    }
});

export const contactDelete = value => ({
    type: actionTypes.DELETE_CONTACT,
    payload: value
});

export const contactFilter = value => ({
    type: actionTypes.FILTER_CONTACT,
    payload: value
});