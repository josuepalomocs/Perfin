import React, { ReactElement } from 'react';

interface FormProps {
  children: ReactElement | ReactElement[],
  className?: string,
  onSubmit?: (e: any) => void,
}

const Form = ({ children, className, onSubmit } : FormProps) => {
  return (
    <form className={className} onSubmit={onSubmit}>
      { children }
    </form>
  );
};

export default Form;