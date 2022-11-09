import React, { ReactElement } from 'react';
import styles from './list.module.css';

interface ListProps {
	className: string,
	type: 'ul' | 'ol',
	children: ReactElement | ReactElement[],
}

const List = ({ className, type, children } : ListProps) => {
	const Component = type;
	return (
		<Component className={className}>
			{ children }
		</Component>
	);
}

export default List;