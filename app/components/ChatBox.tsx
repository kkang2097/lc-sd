'use client';

import React, { useState } from 'react';
import type { MessageProps } from './Message';
import { sendMessageToChatGPT } from '../services/chat';
import { edgeServerAppPaths } from 'next/dist/build/webpack/plugins/pages-manifest-plugin';
import { GlobalContext } from '../providers/GlobalProvider';
import { Node, Edge } from 'reactflow';

interface ChatBoxProps {
  messages: MessageProps[];
  setMessages: (messages: MessageProps[]) => void;
  nodes: Node[];
  edges: Edge[];
  content: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, setMessages, nodes, edges, content }) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      const userMessage: MessageProps = {
        text: inputText,
        userType: 'user'
      };
      
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInputText('');
      setIsLoading(true);

      try {
        const response = await sendMessageToChatGPT(updatedMessages, nodes, edges, content);
        const assistantMessage: MessageProps = {
          text: response,
          userType: 'assistant'
        };
        setMessages([...updatedMessages, assistantMessage]);
      } catch (error) {
        console.error('Error:', error);
        const errorMessage: MessageProps = {
          text: 'Sorry, I encountered an error. Please try again.',
          userType: 'assistant'
        };
        setMessages([...updatedMessages, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto rounded-lg">
      <div className="flex gap-2 min-h-[50px]">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-800"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </form>
  );
};

export default ChatBox;

