'use client';
import React, { useState } from 'react';
import DagVisualizer from './DagVisualizer';
import Notepad from './Notepad';
import { ShortcutTooltip } from './tooltips/ShortcutTooltip';

const EditContainer: React.FC = () => {
  const [activeView, setActiveView] = useState<'dag' | 'notepad'>('dag');

  return (
    <div className="w-full flex flex-col px-2 rounded-sm">
      <ShortcutTooltip shortcut="Press Shift + Tab to switch to DAG view">
      <div className="inline flex">
          <button
            onClick={() => setActiveView('dag')}
            className={`px-4 py-2 rounded-t-md ${
              activeView === 'dag'
                ? 'bg-primary-pure text-white'
                : 'bg-primary-light text-gray-700 hover:bg-light-medium'
            }`}
          >
            DAG Visualizer
          </button>
          <button
            onClick={() => setActiveView('notepad')}
            className={`px-4 py-2 rounded-t-md ${
              activeView === 'notepad'
                ? 'bg-primary-pure text-white'
                : 'bg-primary-light text-gray-700 hover:bg-light-medium'
            }`}
          >
            Notepad
          </button>
        </div>
      </ShortcutTooltip>
        {activeView === 'dag' ? <DagVisualizer /> : <Notepad />}
    </div>
  );
};

export default EditContainer;
