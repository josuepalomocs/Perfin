import React from 'react';
import Container from '../Container/Container';

interface InputProps {
  label?: string,
  labelClassName?: string,
  inputClassName?: string,
  id?: string,
  type?: 'text' | 'email' | 'password'
}

const Input = (inputProps : InputProps) => {
  const {
    label, labelClassName, inputClassName,
    id, type,
  } = inputProps;
  
  return (
    <Container className={''} type='div'>
      {label ? <label className={labelClassName} htmlFor={id}>{ label }</label> : <></>}
      <input className={inputClassName} id={id} type={type} />
    </Container>
  );
}

export default Input;