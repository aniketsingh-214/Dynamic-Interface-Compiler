import React from 'react';

function TextComponent({ content, level = 'p', className = '' }) {
  const Tag = level === 'h1' ? 'h1' : level === 'h2' ? 'h2' : 'p';
  const baseStyle = "text-gray-800";
  const tagStyle = {
    h1: "text-4xl font-bold my-4",
    h2: "text-2xl font-semibold my-3",
    p: "text-base my-2"
  };

  return (
    <Tag className={`${baseStyle} ${tagStyle[Tag]} ${className}`}>
      {content || 'Default text content'}
    </Tag>
  );
}

export default TextComponent;