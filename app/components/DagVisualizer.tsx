import React from 'react';

const DagVisualizer: React.FC = () => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 max-w-md w-flex">
      <h2 className="text-xl font-semibold text-gray-800">DAG Visualizer</h2>
      <p className="mt-2 text-gray-600">This component will visualize a Directed Acyclic Graph.</p>
    </div>
  );
};

export default DagVisualizer;
