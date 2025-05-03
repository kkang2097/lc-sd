'use client';

import React, { useContext } from 'react';
import Message from './Message';
import ChatBox from './ChatBox';
import { ChatProvider, chatContext } from '../providers/ChatProvider';
import type { MessageProps } from './Message';

const ChatWindowContent: React.FC = () => {
  const { messages } = useContext(chatContext);

  return (
    <div className="border border-gray-300 rounded-lg p-4 w-full h-min-screen flex flex-col">
      <div className="flex-1">
        <div className="flex flex-col mb-2">
          {messages.map((message: MessageProps, index: number) => (
            <Message
              key={index}
              text={message.text}
              userType={message.userType}
            />
          ))}
        </div>
      </div>
      <div className="mt-auto">
        <ChatBox />
      </div>
    </div>
  );
};

const ChatWindow: React.FC = () => {
  return (
    <ChatProvider>
      <ChatWindowContent />
    </ChatProvider>
  );
};

export default ChatWindow;

