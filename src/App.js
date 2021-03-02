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

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    messsage: '',
    alert: null
  };

   componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
      
      if (parseContacts) {
        this.setState({ contacts: parseContacts })
      }
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  inputFindId = shortid.generate();

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleSubmitForm = formdata => {
    const newContact = {
      id: shortid.generate(),
      ...formdata,
    };

    if (newContact.name === '') {
      // alert('Please enter contact name');
      this.setState({ message: 'Please enter contact name!', alert: true })
      setTimeout(() => {
        this.setState({ alert: false })
      }, 3000)
      return;
    }
    if (newContact.number === '') {
      // alert('Please enter contact phone number');
      this.setState({ message: 'Please enter contact phone number!', alert: true })
      setTimeout(() => {
        this.setState({ alert: false })
      }, 3000)
      return;
    }

    const hasContact = this.state.contacts.some(
      contact => contact.name === newContact.name,
    );

    if (hasContact) {
      // alert(`${newContact.name} is already in contacts`)
      this.setState({ message: `${newContact.name} is already in contacts!`, alert: true })
      setTimeout(() => {
        this.setState({ alert: false })
      }, 3000)
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  handleFindChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
  };

  render() {
    const { filter, contacts, message, alert } = this.state;

    const visibleContacts = this.getVisibleContacts();

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
              contacts={visibleContacts}
              onDeleteContact={this.deleteContact}
            />
          )}
        </Section>
      </>
    );
  }
}

export default App;
