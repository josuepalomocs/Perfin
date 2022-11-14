import React, { ReactElement } from 'react';
import styles from './button.module.css';

interface ButtonProps {
	children: string | ReactElement | ReactElement[],
	id: string,
	className?: string,
	onClick?: () => void,
}

const Button = ({ children, id, className = styles.default, onClick } : ButtonProps) => {
	return (
		<button id={id} className={className} onClick={onClick}>{ children }</button>
	);
}

export default Button;