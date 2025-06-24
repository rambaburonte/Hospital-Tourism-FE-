import React from 'react';

interface PlaceholderProps {
  title: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-lg text-gray-600">This page is under construction.</p>
      </div>
    </div>
  );
};

export default Placeholder;
