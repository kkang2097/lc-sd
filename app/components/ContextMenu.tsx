import React from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onAddNode: () => void;
  onDeleteSelected: () => void;
  onClearCanvas: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  onClose,
  onAddNode,
  onDeleteSelected,
  onClearCanvas,
}) => {
  return (
    <div
      className="fixed bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
      style={{
        left: x,
        top: y,
      }}
    >
      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={onAddNode}>
        Add Node
      </div>
      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={onDeleteSelected}>
        Delete Selected
      </div>
      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={onClearCanvas}>
        Clear Canvas
      </div>
    </div>
  );
};

export default ContextMenu; 