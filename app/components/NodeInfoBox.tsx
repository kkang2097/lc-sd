import React, { useState, useEffect } from 'react';
import { Node } from 'reactflow';

interface NodeInfoBoxProps {
  selectedNode: Node | null;
  onNodeUpdate: (nodeId: string, updates: { x?: number; y?: number; label?: string }) => void;
}

const NodeInfoBox: React.FC<NodeInfoBoxProps> = ({ selectedNode, onNodeUpdate }) => {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [label, setLabel] = useState<string>('');

  useEffect(() => {
    if (selectedNode) {
      setX(selectedNode.position.x);
      setY(selectedNode.position.y);
      setLabel(selectedNode.data.label);
    } else {
      // Clear state when node is unselected
      setX(0);
      setY(0);
      setLabel('');
    }
  }, [selectedNode]);

  if (!selectedNode) return null;

  const handleXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newX = parseFloat(e.target.value);
    if (!isNaN(newX)) {
      setX(newX);
      onNodeUpdate(selectedNode.id, { x: newX });
    }
  };

  const handleYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newY = parseFloat(e.target.value);
    if (!isNaN(newY)) {
      setY(newY);
      onNodeUpdate(selectedNode.id, { y: newY });
    }
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLabel = e.target.value;
    setLabel(newLabel);
    onNodeUpdate(selectedNode.id, { label: newLabel });
  };

  return (
    <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-md border border-gray-200 z-10">
      <div className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Node Name</label>
          <input
            type="text"
            value={label}
            onChange={handleLabelChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">X Position</label>
          <input
            type="number"
            value={x}
            onChange={handleXChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Y Position</label>
          <input
            type="number"
            value={y}
            onChange={handleYChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            
          />
        </div>
      </div>
    </div>
  );
};

export default NodeInfoBox; 