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
    { id: '1', type: 'input', data: { label: 'Client' }, position: { x: 400, y: 0 } },
    { id: '2', data: { label: 'Load Balancer' }, position: { x: 400, y: 100 } },
    { id: '3', data: { label: 'API Gateway' }, position: { x: 400, y: 200 } },
    { id: '4', data: { label: 'Cache Service' }, position: { x: 200, y: 300 } },
    { id: '5', data: { label: 'Cache Node 1' }, position: { x: 100, y: 400 } },
    { id: '6', data: { label: 'Cache Node 2' }, position: { x: 200, y: 400 } },
    { id: '7', data: { label: 'Cache Node 3' }, position: { x: 300, y: 400 } },
    { id: '8', data: { label: 'Database' }, position: { x: 600, y: 300 } },
    { id: '9', data: { label: 'Consistent Hash Ring' }, position: { x: 200, y: 500 } },
    { id: '10', data: { label: 'Cache Manager' }, position: { x: 400, y: 400 } },
    { id: '11', data: { label: 'Health Monitor' }, position: { x: 600, y: 400 } },
    { id: '12', data: { label: 'Cache Eviction Service' }, position: { x: 300, y: 500 } },
];

const INITIAL_EDGES: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
    { id: 'e3-4', source: '3', target: '4', animated: true },
    { id: 'e3-8', source: '3', target: '8', animated: true },
    { id: 'e4-5', source: '4', target: '5', animated: true },
    { id: 'e4-6', source: '4', target: '6', animated: true },
    { id: 'e4-7', source: '4', target: '7', animated: true },
    { id: 'e4-10', source: '4', target: '10', animated: true },
    { id: 'e10-11', source: '10', target: '11', animated: true },
    { id: 'e10-12', source: '10', target: '12', animated: true },
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
