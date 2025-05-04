import React, { useContext } from 'react';
import { GlobalContext } from '../providers/GlobalProvider';

const NotepadContent: React.FC = () => {
  const { content, setContent } = useContext(GlobalContext);
  
  return (
    <div className="w-full shadow-sm">
      <textarea
        className="w-full h-[600px] p-1 resize-none focus:outline-none"
        placeholder="Start typing your notes here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
};

const Notepad: React.FC = () => {
  return <NotepadContent />;
};

export default Notepad; 