"use client";

import React, { createContext, useState, useCallback } from 'react';
import { MessageProps } from '../components/Message';
import { Node, Edge } from 'reactflow';
import { NodeChange, EdgeChange } from 'reactflow';
import { applyNodeChanges, applyEdgeChanges } from 'reactflow';

interface GlobalContextType {
    content: string;
    messages: MessageProps[];
    nodes: Node[];
    edges: Edge[];
    setContent: (content: string) => void;
    setMessages: (messages: MessageProps[]) => void;
    setNodes: (nodes: Node[] | ((prev: Node[]) => Node[])) => void;
    setEdges: (edges: Edge[] | ((prev: Edge[]) => Edge[])) => void;
    onNodesChange: (changes: NodeChange[]) => void;
    onEdgesChange: (changes: EdgeChange[]) => void;
}

export const GlobalContext = createContext<GlobalContextType>({
    content: '',
    messages: [],
    nodes: [],
    edges: [],
    setContent: () => {},
    setMessages: () => {},
    setNodes: () => {},
    setEdges: () => {},
    onNodesChange: () => {},
    onEdgesChange: () => {},
});

const INITIAL_NODES: Node[] = [
    { id: '1', type: 'input', data: { label: 'Load Balancer' }, position: { x: 250, y: 0 } },
    { id: '2', data: { label: 'Job Scheduler' }, position: { x: 100, y: 100 } },
    { id: '3', data: { label: 'Cloud Storage' }, position: { x: 400, y: 100 } },
  ];
  
const INITIAL_EDGES: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e1-3', source: '1', target: '3', animated: true },
    { id: 'e2-4', source: '2', target: '4', animated: true },
  ];

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<string>('');
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES);
  const [edges, setEdges] = useState<Edge[]>(INITIAL_EDGES);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        content,
        messages,
        nodes,
        edges,
        setContent,
        setMessages,
        setNodes,
        setEdges,
        onNodesChange,
        onEdgesChange,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
