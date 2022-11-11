import React, { ElementType, ReactElement } from 'react';
import styles from './text.module.css';

interface TextProps {
    children: string,
    className?: string,
    type?: 'h1' | 'h2' | 'h3' |
        'h4' | 'h5' | 'h6' |
        'p' | 'span' | 'strong'
}

const Text = ({ children, className = styles.default, type = 'p' } : TextProps) => {
    const Component = type;
    return (
        <Component className={className}>
            { children }
        </Component>
    );
}

export default Text;