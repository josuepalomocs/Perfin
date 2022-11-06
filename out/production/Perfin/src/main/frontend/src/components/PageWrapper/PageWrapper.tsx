import React, { ReactElement } from 'react';
import styles from './pageWrapper.module.css';

interface PageWrapperProps {
    children: ReactElement | ReactElement[]
}

const PageWrapper = ({ children } : PageWrapperProps) => {
    return (
        <div className={styles.pageWrapper}>
            { children }
        </div>
    );
}

export default PageWrapper;