'use client';
import React, { useState, useEffect } from 'react';
import DagVisualizer from './DagVisualizer';
import Notepad from './Notepad';
import ChatWindow from './ChatWindow';
import { ShortcutTooltip } from './tooltips/ShortcutTooltip';

const EditContainer: React.FC = () => {
  const [activeView, setActiveView] = useState<'dag' | 'notepad' | 'chat'>('dag');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === 'Tab') {
        e.preventDefault();
        const views: ('dag' | 'notepad' | 'chat')[] = ['dag', 'notepad', 'chat'];
        const currentIndex = views.indexOf(activeView);
        const nextIndex = (currentIndex + 1) % views.length;
        setActiveView(views[nextIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeView]);

  return (
    <div className="w-full h-full flex flex-col px-2 rounded-sm">
      <ShortcutTooltip shortcut="Press Shift + Tab to switch to DAG view">
      <div className="inline flex">
        <button
          onClick={() => setActiveView('chat')}
          className={`px-4 py-2 rounded-t-md focus:outline-none ${
          activeView === 'chat'
            ? 'bg-primary-pure text-white'
            : 'bg-primary-light text-gray-700 hover:bg-light-medium'
          }`}>
         Chat 
          </button>
          <button
            onClick={() => setActiveView('dag')}
            className={`px-4 py-2 rounded-t-md focus:outline-none ${
              activeView === 'dag'
                ? 'bg-primary-pure text-white'
                : 'bg-primary-light text-gray-700 hover:bg-light-medium'
            }`}
          >
            DAG Visualizer
          </button>
          <button
            onClick={() => setActiveView('notepad')}
            className={`px-4 py-2 rounded-t-md focus:outline-none ${
              activeView === 'notepad'
                ? 'bg-primary-pure text-white'
                : 'bg-primary-light text-gray-700 hover:bg-light-medium'
            }`}
          >
            Notepad
          </button>
        </div>
      </ShortcutTooltip>
        {activeView === 'dag' ? <DagVisualizer /> : activeView === 'notepad' ? <Notepad /> : <ChatWindow />}
    </div>
  );
};

export default EditContainer;
