import React, { ReactElement } from 'react';
import styles from './container.module.css';

interface ContainerProps {
  children: ReactElement | ReactElement[],
  className?: string,
  type?: 
    'div' | 'section' | 'main' | 
    'body' | 'aside' | 'header' |
    'footer',
}

const Container = ({ children, className = styles.default, type = 'div' } : ContainerProps) => {
  const Component = type;
  return (
    <Component className={className}>
      { children }
    </Component>
  );
};

export default Container;