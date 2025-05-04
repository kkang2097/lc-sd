'use client';

import React, { useCallback, useContext, useEffect, useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection,
  ConnectionLineType,
  BackgroundVariant,
  EdgeChange,
  NodeChange,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { GlobalContext } from '../providers/GlobalProvider';

const DagVisualizerCanvas: React.FC = () => {
  const { nodes, setNodes, onNodesChange } = useContext(GlobalContext);
  const { edges, setEdges, onEdgesChange } = useContext(GlobalContext);

  const [history, setHistory] = useState<{ nodes: Node[]; edges: Edge[] }[]>([]);
  const [future, setFuture] = useState<{ nodes: Node[]; edges: Edge[] }[]>([]);

  // Helper: Save current state to history
  const pushToHistory = useCallback(() => {
    setHistory((prev) => [...prev, { nodes, edges }]);
    setFuture([]); // clear redo stack on new action
  }, [nodes, edges]);

  const undo = useCallback(() => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setFuture((f) => [{ nodes, edges }, ...f]);
    setNodes(prev.nodes);
    setEdges(prev.edges);
  }, [history, nodes, edges, setNodes, setEdges]);

  const redo = useCallback(() => {
    if (future.length === 0) return;
    const next = future[0];
    setFuture((f) => f.slice(1));
    setHistory((h) => [...h, { nodes, edges }]);
    setNodes(next.nodes);
    setEdges(next.edges);
  }, [future, nodes, edges, setNodes, setEdges]);

  const handleConnect = useCallback(
    (connection: Connection) => {
      pushToHistory();
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
    },
    [setEdges, pushToHistory]
  );

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      pushToHistory();
      onNodesChange(changes);
    },
    [onNodesChange, pushToHistory]
  );

  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      pushToHistory();
      onEdgesChange(changes);
    },
    [onEdgesChange, pushToHistory]
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        undo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  return (
    <div className="relative w-full h-full border border-gray-300 rounded-xl p-4 shadow-sm">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

const DagVisualizer: React.FC = () => {
  return (
    <div className="w-full rounded-xl p-1 shadow-sm">
      <div className="h-[600px] rounded-md overflow-hidden">
        <ReactFlowProvider>
          <DagVisualizerCanvas />
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default DagVisualizer;