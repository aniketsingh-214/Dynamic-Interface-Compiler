import React from 'react';

function ImageComponent({ src, alt = 'Dynamic Image', caption, className = '' }) {
  return (
    <figure className={`my-4 ${className}`}>
      <img
        src={src || 'https://via.placeholder.com/400x200?text=Provide+a+SRC'}
        alt={alt}
        className="max-w-full h-auto rounded-lg shadow-md"
      />
      {caption && <figcaption className="text-center text-sm text-gray-500 mt-2">{caption}</figcaption>}
    </figure>
  );
}

export default ImageComponent;