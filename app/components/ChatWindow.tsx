import React from 'react';
import Message from './Message';

const ChatWindow: React.FC = () => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 w-flex h-screen ml-auto">
      <div className="flex flex-col text-right mb-2 items-end">
        <Message text="Hello! How can I help you today?" />
        <Message text="I have a question about my order." />
        <Message text="Sure! Please provide your order number." />
      </div>
    </div>
  );
};

export default ChatWindow;

