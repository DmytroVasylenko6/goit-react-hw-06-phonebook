import PropTypes from 'prop-types';
import s from './ContactsList.module.css';
import './fade.css'
import Button from '../Button/Button';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import * as contactsAction from '../../redux/contacts/contacts-actions'

 const ContactsList = ({ contacts, onDeleteContact }) => {
  return (
    <>
      <TransitionGroup component="ul" className={s.list}>
        
        {contacts.map(({ name, number, id }) => {
          return (
            <CSSTransition key={id} timeout={250} classNames="e-fade" appear={true}>
            <li id={id}  className={s.item}>
              <p>
                <span className={s.contactName}>{name}</span> <span>{number}</span> 
              </p>
              <Button
                text={'Delete'}
                listener={() => onDeleteContact(id)}
                color="red"
              />
              </li>
              </CSSTransition>
          );
        })}
      </TransitionGroup>
    </>
  );
 }



ContactsList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func,
};

const getVisibleContacts = (allContacts, filter) => {
  const normalizeFilter = filter.toLowerCase();
  return allContacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizeFilter),
  );
};


const mapStateToProps = ({contacts: {items, filter}}) => ({
  contacts: getVisibleContacts(items, filter)
})

const mapDispatchToProps = dispatch => ({
onDeleteContact: (id) => {dispatch(contactsAction.contactDelete(id))}
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);