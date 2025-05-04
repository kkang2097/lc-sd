'use client';
import React, { useState } from 'react';
import DagVisualizer from './DagVisualizer';
import Notepad from './Notepad';

const EditContainer: React.FC = () => {
  const [activeView, setActiveView] = useState<'dag' | 'notepad'>('dag');

  return (
    <div className="w-full flex flex-col px-2 rounded-sm">
      <div className="inline flex gap-4 mb-4">
        <button
          onClick={() => setActiveView('dag')}
          className={`px-4 py-2 rounded-md mr-4 ${
            activeView === 'dag'
              ? 'bg-primary-pure text-white'
              : 'bg-primary-light text-gray-700 hover:bg-gray-300'
          }`}
        >
          DAG Visualizer
        </button>
        <button
          onClick={() => setActiveView('notepad')}
          className={`px-4 py-2 rounded-md ${
            activeView === 'notepad'
              ? 'bg-primary-pure text-white'
              : 'bg-primary-light text-gray-700 hover:bg-gray-300'
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
