import { createAction } from '@reduxjs/toolkit';
import shortid from 'shortid';


export const contactsParse = createAction('contacts/parse');


export const contactAdd = createAction('contacts/add', ({ name, number }) => ({
        payload: {
            id: shortid.generate(),
            name: name,
            number: number
        }
}));

export const contactDelete = createAction( 'contacts/filter');

export const contactFilter = createAction('contacts/delete');
