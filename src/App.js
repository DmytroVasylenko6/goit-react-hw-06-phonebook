import React, { Component } from 'react';
import Section from './components/Section/Section';
import ContactsList from './components/ContactsList/ContsctsList';
import Form from './components/Form/Form';
import shortid from 'shortid';
import Input from './components/Input/Input';
import Container from './components/Container/Container';
import { CSSTransition } from 'react-transition-group';
import fadeFindContacts from './fadeFindContacts.module.css';
import fadeNotification from './fadeNotification.module.css';
import Notification from './components/Notification';
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

  handleSubmitForm = newContact => {
 
    if (newContact.name === '') {
      this.visibleMessage('Please enter contact name!');
      return;
    };
    if (newContact.number === '') {
      this.visibleMessage('Please enter contact phone number!');
      return;
    };

    const hasContact = this.props.contacts.some(
      contact => contact.name === newContact.name,
    );

    if (hasContact) {
      this.visibleMessage(`${newContact.name} is already in contacts!`);
    } else {
      this.props.onAddContacts(newContact);
    };
  };

  visibleMessage = (stringMessage) => {
        this.setState({ message: stringMessage, alert: true })
      setTimeout(() => {
        this.setState({ alert: false })
      }, 3000)
  }

  handleFindChange = event => {
    const filterValue = event.currentTarget;
    this.props.onFilterContacts(filterValue.value);
  };

  render() {
    const { message, alert } = this.state;
    const { contacts, filter } = this.props;

  
    return (
      <>
        <Section title="PhoneBook" appear={true} styles="phonebook">
          <CSSTransition in={alert} timeout={1000} classNames={fadeNotification} unmountOnExit>
            <Notification text={message} color="red"/>
          </CSSTransition>
          <Form Submit={this.handleSubmitForm} />
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
      onAddContacts: (newContacts) => { dispatch(contactsAction.contactAdd(newContacts)) },
      onFilterContacts: (filter) => {dispatch(contactsAction.contactFilter(filter))}
    })

export default connect(mapStateToProps, mapDispatchToProps)(App);
