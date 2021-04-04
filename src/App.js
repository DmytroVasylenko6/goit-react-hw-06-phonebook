import React, { Component } from 'react';
import Section from './components/Section/Section';
import ContactsList from './components/ContactsList/ContsctsList';
import Form from './components/Form/Form';
import shortid from 'shortid';
import Input from './components/Input/Input';
import Container from './components/Container/Container';
import { CSSTransition } from 'react-transition-group';
import fadeFindContacts from './fadeFindContacts.module.css';
import * as contactsAction from './redux/contacts/contacts-actions';
import { connect } from 'react-redux';

class App extends Component {
  state = {
    messsage: '',
    alert: null
  };

   componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
      
      if (parseContacts) {
        this.props.onParseContacts(parseContacts);
      }
  };
  
  componentDidUpdate(prevProps, prevState) {
    if (this.props.contacts !== prevProps.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.props.contacts))
    }
  }

  inputFindId = shortid.generate();

  handleFindChange = event => {
    const filterValue = event.currentTarget;
    this.props.onFilterContacts(filterValue.value);
  };

  render() {
    
    const { contacts, filter } = this.props;

  
    return (
      <>
        <Section title="PhoneBook" appear={true} styles="phonebook">
          <Form/>
        </Section>
    
        <Section title="Contacts" >
          
           
          <CSSTransition in={contacts.length > 1} timeout={250} classNames={fadeFindContacts} unmountOnExit>
            <Container>
              <Input
                label="Find contacts by name"
                type="text"
                name="filter"
                value={filter}
                id={this.inputFindId}
                placeholder="Find..."
                onChange={this.handleFindChange}
              />
              </Container>
            </CSSTransition>
          

          {contacts.length === 0 ? (
            <span style={{ display: 'block', textAlign: 'center' }}>
              No contacts
            </span>
          ) : (
            <ContactsList
              contacts={contacts}
            />
           )} 
        </Section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
    contacts: state.contacts.items,
    filter: state.contacts.filter
  })

    const mapDispatchToProps = (dispatch) => ({
      onParseContacts: (contacts) => { dispatch(contactsAction.contactsParse(contacts)) },
      onFilterContacts: (filter) => {dispatch(contactsAction.contactFilter(filter))}
    })

export default connect(mapStateToProps, mapDispatchToProps)(App);
