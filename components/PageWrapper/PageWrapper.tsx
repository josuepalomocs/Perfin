import React, { ReactElement } from 'react';
import styles from './pageWrapper.module.css';

interface PageWrapperProps {
    children: ReactElement | ReactElement[],
    className?: string,
}

const PageWrapper = ({ children, className = styles.default } : PageWrapperProps) => {
    return (
        <div className={className}>
            { children }
        </div>
    );
}

export default PageWrapper;