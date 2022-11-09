import React, { ReactElement } from 'react';

interface ContainerProps {
  children: ReactElement | ReactElement[],
  className: string,
  type?: 
    'div' | 'section' | 'main' | 
    'body' | 'aside' | 'header' |
    'footer',
}

const Container = ({ children, className, type = 'div' } : ContainerProps) => {
  const Component = type;
  return (
    <Component className={className}>
      { children }
    </Component>
  );
};

export default Container;