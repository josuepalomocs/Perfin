import React, { ElementType, ReactElement } from 'react';

interface TextProps {
    className: string,
    as: 'h1' | 'h2' | 'h3' |
        'h4' | 'h5' | 'h6' |
        'p' | 'span' | 'strong'
    children: ReactElement | ReactElement[],
}

const Text = ({ as, className, children } : TextProps) => {
    const Component = as;
    return (
        <Component className={className}>
            { children }
        </Component>
    );
}

export default Text;