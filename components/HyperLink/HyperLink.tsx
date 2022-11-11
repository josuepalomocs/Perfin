import React, { ReactElement } from 'react';
import styles from './hyperLink.module.css';

interface HyperLinkProps {
  children: any,
  href: string,
  className?: string,
}

const HyperLink = ({ children, href, className = styles.default } : HyperLinkProps) => {
  return (
    <a className={className} href={href}>{ children }</a>
  );
};

export default HyperLink;
