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
import ContextMenu from './ContextMenu';
import NodeInfoBox from './NodeInfoBox';

const DagVisualizerCanvas: React.FC = () => {
  const { nodes, setNodes, onNodesChange } = useContext(GlobalContext);
  const { edges, setEdges, onEdgesChange } = useContext(GlobalContext);

  const [history, setHistory] = useState<{ nodes: Node[]; edges: Edge[] }[]>([]);
  const [future, setFuture] = useState<{ nodes: Node[]; edges: Edge[] }[]>([]);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // Helper: Save current state to history
  const pushToHistory = useCallback(() => {
    setHistory((prev) => [...prev, { nodes, edges }]);
    setFuture([]); // clear redo stack on new action
  }, [nodes, edges]);

  const handleNodeUpdate = useCallback((nodeId: string, updates: { x?: number; y?: number; label?: string }) => {
    pushToHistory();
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            position: {
              x: updates.x !== undefined ? updates.x : node.position.x,
              y: updates.y !== undefined ? updates.y : node.position.y,
            },
            data: {
              ...node.data,
              label: updates.label !== undefined ? updates.label : node.data.label,
            },
          };
        }
        return node;
      })
    );
  }, [setNodes, pushToHistory]);

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
      
      // Update selected node based on the changes
      const selectionChanges = changes.filter(change => change.type === 'select');
      if (selectionChanges.length > 0) {
        // Get the current state of nodes after the changes
        const updatedNodes = nodes.map(node => {
          const change = selectionChanges.find(c => c.id === node.id);
          if (change) {
            return { ...node, selected: change.selected };
          }
          return node;
        });
        
        // Find the selected node in the updated state
        const selectedNodes = updatedNodes.filter(node => node.selected);
        setSelectedNode(selectedNodes.length === 1 ? selectedNodes[0] : null);
      }
    },
    [onNodesChange, pushToHistory, nodes]
  );

  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      pushToHistory();
      onEdgesChange(changes);
    },
    [onEdgesChange, pushToHistory]
  );

  const handleContextMenu = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      setContextMenu({ x: event.clientX, y: event.clientY });
    },
    []
  );

  const handleAddNode = useCallback(() => {
    pushToHistory();
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: 'default',
      data: { label: `Node ${nodes.length + 1}` },
      position: { x: 100, y: 100 },
    };
    setNodes((nds) => [...nds, newNode]);
    setContextMenu(null);
  }, [nodes, setNodes, pushToHistory]);

  const handleDeleteSelected = useCallback(() => {
    pushToHistory();
    const selectedNodes = nodes.filter((node) => node.selected);
    const selectedNodeIds = selectedNodes.map((node) => node.id);
    const selectedEdges = edges.filter(
      (edge) =>
        selectedNodeIds.includes(edge.source) || selectedNodeIds.includes(edge.target)
    );

    setNodes((nds) => nds.filter((node) => !selectedNodeIds.includes(node.id)));
    setEdges((eds) => eds.filter((edge) => !selectedEdges.includes(edge)));
    setContextMenu(null);
  }, [nodes, edges, setNodes, setEdges, pushToHistory]);

  const handleClearCanvas = useCallback(() => {
    pushToHistory();
    setNodes([]);
    setEdges([]);
    setContextMenu(null);
  }, [setNodes, setEdges, pushToHistory]);

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

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
        onContextMenu={handleContextMenu}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Controls />
        <NodeInfoBox selectedNode={selectedNode} onNodeUpdate={handleNodeUpdate} />
      </ReactFlow>
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onAddNode={handleAddNode}
          onDeleteSelected={handleDeleteSelected}
          onClearCanvas={handleClearCanvas}
        />
      )}
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