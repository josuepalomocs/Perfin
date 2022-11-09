import React, { ReactElement } from 'react';

interface FormProps {
  children: ReactElement | ReactElement[],
  onSubmit: () => void,
}

const Form = ({ children, onSubmit } : FormProps) => {
  return (
    <form onSubmit={onSubmit}>
      { children }
    </form>
  );
};

export default Form;