import React, { Component } from 'react';
import shortid from 'shortid';
import Input from '../Input/Input';
import Button from '../Button/Button';
import s from './Form.module.css';
import { CSSTransition } from 'react-transition-group';
import fadeNotification from '../../fadeNotification.module.css';
import Notification from '../Notification';
import { connect } from 'react-redux';
import * as contactsAction from '../../redux/contacts/contacts-actions'

class Form extends Component {
  state = {
    name: '',
    number: '',
    messsage: '',
    alert: null
  };

  inputNameId = shortid.generate();
  inputNumberId = shortid.generate();

  handleInputChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleAddContact = e => {
    e.preventDefault();
    this.handleSubmitForm(this.state.name, this.state.number);
    this.reset();
  };

  handleSubmitForm = (name, number) => {
 
    if (name === '') {
      this.visibleMessage('Please enter contact name!');
      return;
    };
    if (number === '') {
      this.visibleMessage('Please enter contact phone number!');
      return;
    };
    
    const hasContact = this.props.contacts.some(
      contact => contact.name === name,
    );

    if (hasContact) {
      this.visibleMessage(`${name} is already in contacts!`);
    } else {
      this.props.onAddContacts({name, number});
    };
  };
  
  
  visibleMessage = (stringMessage) => {
        this.setState({ message: stringMessage, alert: true })
      setTimeout(() => {
        this.setState({ alert: false })
      }, 3000)
  }

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number, message, alert } = this.state;

    return ( <>
      <CSSTransition in={alert} timeout={1000} classNames={fadeNotification} unmountOnExit>
        <Notification text={message} color="red"/>
      </CSSTransition>
      <form onSubmit={this.handleAddContact} className={s.form}>
        <Input
          label="Name"
          type="text"
          name="name"
          value={name}
          id={this.inputNameId}
          placeholder="Enter name..."
          onChange={this.handleInputChange}
        />

        <Input
          label="Number"
          type="tel"
          name="number"
          value={number}
          id={this.inputNumberId}
          placeholder="+380990101010"
          onChange={this.handleInputChange}
          pattern="^\+?[0-9]{10,15}$"
        />

        <Button text={'Add contact'} type={'submit'} color={'blue'} />
      </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
    contacts: state.contacts.items,
  })

const mapDispatchToProps = dispatch => ({
 onAddContacts: (newContacts) => { dispatch(contactsAction.contactAdd(newContacts)) },
})

export default connect(mapStateToProps , mapDispatchToProps)(Form);
