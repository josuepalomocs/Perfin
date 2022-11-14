import React, { ReactElement } from 'react';
import styles from './listItem.module.css'; 

interface ListItem {
  children: ReactElement | ReactElement[],
  className?: string,
}

const ListItem = ({ children, className = styles.default } : ListItem) => {
  return (
    <li className={className}>
      { children }
    </li>
  );
};

export default ListItem;
