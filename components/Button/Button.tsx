import React, { ReactElement } from 'react';
import styles from './button.module.css';

interface ButtonProps {
	children: string | ReactElement | ReactElement[],
	className?: string,
	onClick?: () => void,
}

const Button = ({ children, className = styles.default, onClick } : ButtonProps) => {
	return (
		<button className={className} onClick={onClick}>{ children }</button>
	);
}

export default Button;