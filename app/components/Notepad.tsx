import React from 'react';

const Notepad: React.FC = () => {
  return (
    <div className="w-full border shadow-sm p-1">
      <textarea
        className="w-full h-[600px] p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Start typing your notes here..."
      />
    </div>
  );
};

export default Notepad; 