import React from 'react';
import styles from './input.module.css';

interface InputProps {
  id: string,
  className?: string,
  type?: 
    'text' | 'email' | 'password' |
    'checkbox'
  placeholder?: string,
  onChange?: React.Dispatch<React.SetStateAction<any>>
}

const Input = ({ id, className = styles.default, type = 'text', placeholder, onChange } : InputProps) => {
  return (
    <input className={className} id={id} type={type} placeholder={placeholder} 
      onChange={(e) => {onChange ? onChange(e.currentTarget.value) : null}} />
  );
}

export default Input;