import React from 'react';
import styles from './image.module.css';

interface ImageProps {
    src: string,
    className?: string,
    alt?: string,
    width?: number,
    height?: number,
}

const Image = ({ src, className = styles.default, alt, width = 40, height = 40 } : ImageProps) => {
    return (
        <img src={src} className={className} alt={alt} width={width} height={height} />
    );
}

export default Image;