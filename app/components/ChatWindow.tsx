'use client';

import React, { useContext } from 'react';
import Message from './Message';
import ChatBox from './ChatBox';
import { ChatProvider, chatContext } from '../providers/ChatProvider';
import type { MessageProps } from './Message';

const ChatWindowContent: React.FC = () => {
  const { messages } = useContext(chatContext);

  return (
    <div className="border border-gray-300 rounded-lg p-4 w-full h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4">
          {messages.map((message: MessageProps, index: number) => (
            <Message
              key={index}
              text={message.text}
              userType={message.userType}
            />
          ))}
        </div>
      </div>
      <div className="mt-4">
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

