import React from 'react';

interface ImageProps {
    className: string,
    src: string,
    alt: string,
    width: number,
    height: number,
}

const Image = ({ className, src, alt, width, height } : ImageProps) => {
    return (
        <img className={className} src={src} alt={alt} width={width} height={height} />
    );
}

export default Image;