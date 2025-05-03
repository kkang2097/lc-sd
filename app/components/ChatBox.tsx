'use client';

import React, { useState, useContext } from 'react';
import { chatContext } from '../providers/ChatProvider';
import type { MessageProps } from './Message';

const ChatBox: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const { messages, setMessages } = useContext(chatContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      const newMessage: MessageProps = {
        text: inputText,
        userType: 'user'
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-1 rounded-lg">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-800"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default ChatBox;

