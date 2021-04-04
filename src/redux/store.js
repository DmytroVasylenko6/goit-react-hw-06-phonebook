import { createStore, combineReducers} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import contactsReducer from './contacts/contacts-reducer';


const messageInitialState = {
    messsage: ''
}

const alertInitialState = {
    alert: null
}


const rootReducer = combineReducers({
    contacts: contactsReducer,
})

const store = createStore( rootReducer, composeWithDevTools());

export default store