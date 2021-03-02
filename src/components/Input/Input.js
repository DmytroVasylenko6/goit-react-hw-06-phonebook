import PropTypes from 'prop-types';
import s from './Input.module.css';

function Input({
  name,
  label,
  value,
  id,
  placeholder,
  type,
  onChange,
  pattern,
}) {
  return (
    <label htmlFor={id} className={s.label}>
      {label}
      <input
        type={type}
        name={name}
        value={value}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        className={s.input}
        pattern={pattern}
      />
    </label>
  );
}

Input.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  pattern: PropTypes.string,
};

export default Input;
