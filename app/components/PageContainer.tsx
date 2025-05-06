import React from 'react';
import ChatWindow from './ChatWindow';
import EditContainer from './EditContainer';
import DesignPrompt from './DesignPrompt';
import EvaluationCard from './EvaluationCard';

const PageContainer: React.FC = () => {
  return (
    <div className="min-h-screen flex  w-full flex-row items-right p-1 px-4 pt-8">
      <div className="border border-gray-300 rounded-lg max-w-1/3 w-full h-full">
      <DesignPrompt />
      <EvaluationCard />
      </div>
      <EditContainer />
    </div>
  );
};

export default PageContainer;
