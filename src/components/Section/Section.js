import PropTypes from 'prop-types';
import s from './Section.module.css';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

export default function Section({ title, children, appear, styles}) {
  const style = [styles === 'phonebook' ? s.titlePhonebook : s.titleContacts];

  return (
    <section className={s.section}>
      <CSSTransition in={true} appear={appear} timeout ={500} classNames={s} unmountOnExit>
        {title && <h2 className={classNames(style.join(' '))}>{title}</h2>}
      </CSSTransition>
      {children}
    </section>
  );
}

Section.propTypes = {
  title: PropTypes.string,
};
