import PropTypes from 'prop-types';
import s from './Button.module.css';
import classNames from 'classnames';

export default function Button({ text, listener, type, color }) {
  const blueColor = s.blueColor;
  const redColor = s.redColor;

  const style = [s.button];

  if (color === 'red') {
    style.push(redColor);
  }

  if (color === 'blue') {
    style.push(blueColor);
  }

  return (
    <button
      className={classNames(style.join(' '))}
      type={type}
      onClick={listener}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  listener: PropTypes.func,
  type: PropTypes.string,
};
