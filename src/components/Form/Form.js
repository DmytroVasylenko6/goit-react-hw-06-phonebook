import React, { Component } from 'react';
import shortid from 'shortid';
import Input from '../Input/Input';
import Button from '../Button/Button';
import s from './Form.module.css';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  inputNameId = shortid.generate();
  inputNumberId = shortid.generate();

  handleInputChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleAddContact = e => {
    e.preventDefault();
    this.props.Submit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
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
    );
  }
}

export default Form;
