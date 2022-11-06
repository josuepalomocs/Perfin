import React from 'react';
import styles from './button.module.css';

interface ButtonProps {
    className: string,
    text?: string,
    onClick?: () => void,
}

const Button = ({ className, text, onClick } : ButtonProps) => {
    return (
        <button className={`${className} ${styles.default}`} onClick={onClick}>{text}</button>
    );
}

export default Button;