import PropTypes from 'prop-types';
import s from './Notification.module.css';
import classNames from 'classnames';

export default function Notification({ text, color }) {
  const blueColor = s.blueColor;
  const redColor = s.redColor;

  const style = [s.notification];

  if (color === 'red') {
    style.push(redColor);
  }

  if (color === 'blue') {
    style.push(blueColor);
  }

  return (
    <p className={classNames(style.join(' '))}>
      {text}
    </p>
  );
}

Notification.propTypes = {
  text: PropTypes.string,
};