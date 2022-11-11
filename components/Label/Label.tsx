import React, { ReactElement } from 'react';
import styles from './label.module.css';

interface LabelProps {
  children: string | ReactElement | ReactElement[];
  className?: string,
  htmlFor?: string,
}

const Label = ({ children, className = styles.default, htmlFor } : LabelProps) => {
  return (
    <label className={className} htmlFor={htmlFor}>{ children }</label>
  );
};

export default Label;