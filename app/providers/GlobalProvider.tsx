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

//TODO: Make 20 initial messages
const INITIAL_MESSAGES: MessageProps[] = [
    { text: 'Hello, how are you?', userType: 'user' },
    { text: 'I am good, thank you! How can I help you today?', userType: 'assistant' },
    { text: 'I need help designing a distributed system', userType: 'user' },
    { text: 'I\'d be happy to help! What kind of distributed system are you looking to build?', userType: 'assistant' },
    { text: 'I want to build a scalable caching system', userType: 'user' },
    { text: 'Great choice! A distributed cache can significantly improve system performance. Let\'s start with the basic components.', userType: 'assistant' },
    { text: 'What components do we need?', userType: 'user' },
    { text: 'We\'ll need a load balancer, cache nodes, a consistent hashing mechanism, and a health monitoring system.', userType: 'assistant' },
    { text: 'How does consistent hashing work?', userType: 'user' },
    { text: 'Consistent hashing maps cache keys to nodes in a way that minimizes redistribution when nodes are added or removed.', userType: 'assistant' },
    { text: 'What about cache eviction?', userType: 'user' },
    { text: 'We can implement LRU (Least Recently Used) or LFU (Least Frequently Used) policies for cache eviction.', userType: 'assistant' },
    { text: 'How do we handle node failures?', userType: 'user' },
    { text: 'We can implement health checks and automatic failover to backup nodes when a primary node fails.', userType: 'assistant' },
    { text: 'What about data consistency?', userType: 'user' },
    { text: 'We can use eventual consistency or implement a more strict consistency model depending on your requirements.', userType: 'assistant' },
    { text: 'How do we scale the system?', userType: 'user' },
    { text: 'We can add more cache nodes and use the consistent hashing to distribute the load evenly.', userType: 'assistant' },
    { text: 'What monitoring tools should we use?', userType: 'user' },
    { text: 'We can use Prometheus for metrics collection and Grafana for visualization of system performance.', userType: 'assistant' }
];

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<string>('');
  const [messages, setMessages] = useState<MessageProps[]>(INITIAL_MESSAGES);
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
