'use client';

import React, { useContext } from 'react';
import Message from './Message';
import ChatBox from './ChatBox';
import { GlobalContext } from '../providers/GlobalProvider';
import type { MessageProps } from './Message';

const ChatWindowContent: React.FC = () => {
  const { messages, setMessages } = useContext(GlobalContext);
  const { nodes, edges, content} = useContext(GlobalContext);
  return (
    <div className="rounded-lg p-4 w-full flex flex-col min-h-[600px] md:max-h-[500px] sm:max-h-[400px]">
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-1 max-h-[150px]">
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
        <ChatBox messages={messages} setMessages={setMessages} nodes={nodes} edges={edges} content={content} />
      </div>
    </div>
  );
};

const ChatWindow: React.FC = () => {
  return (
      <ChatWindowContent />
  );
};

export default ChatWindow;

