'use client';
import React, { useState } from 'react';
import DagVisualizer from './DagVisualizer';
import Notepad from './Notepad';

const EditContainer: React.FC = () => {
  const [activeView, setActiveView] = useState<'dag' | 'notepad'>('dag');

  return (
    <div className="w-full flex flex-col rounded-sm">
      <div className="inline flex gap-2 mb-4">
        <button
          onClick={() => setActiveView('dag')}
          className={`px-4 py-2 ${
            activeView === 'dag'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          DAG Visualizer
        </button>
        <button
          onClick={() => setActiveView('notepad')}
          className={`px-4 py-2 ${
            activeView === 'notepad'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Notepad
        </button>
      </div>
      <div className="flex-1">
        {activeView === 'dag' ? <DagVisualizer /> : <Notepad />}
      </div>
    </div>
  );
};

export default EditContainer;
