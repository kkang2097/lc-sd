import React from 'react';
import ChatWindow from './ChatWindow';
import DagVisualizer from './DagVisualizer';
import DesignPrompt from './DesignPrompt';

const PageContainer: React.FC = () => {
  return (
    <div className="min-h-screen flex border border-radius w-full flex-row items-right p-1">
      <DesignPrompt />
      <DagVisualizer />
      <ChatWindow />

    </div>
  );
};

export default PageContainer;
