import React from 'react';

const Notepad: React.FC = () => {
  return (
    <div className="w-full shadow-sm">
      <textarea
        className="w-full h-[600px] p-1 resize-none focus:outline-none"
        placeholder="Start typing your notes here..."
      />
    </div>
  );
};

export default Notepad; 