'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Node, Edge } from 'reactflow';

interface GlobalContextType {
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const INITIAL_NODES: Node[] = [
  { id: '1', type: 'input', data: { label: 'Start' }, position: { x: 250, y: 0 } },
  { id: '2', data: { label: 'Process A' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Process B' }, position: { x: 400, y: 100 } },
  { id: '4', type: 'output', data: { label: 'End' }, position: { x: 250, y: 200 } },
];

const INITIAL_EDGES: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true },
];

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES);
  const [edges, setEdges] = useState<Edge[]>(INITIAL_EDGES);

  return (
    <GlobalContext.Provider value={{ nodes, edges, setNodes, setEdges }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
}; 