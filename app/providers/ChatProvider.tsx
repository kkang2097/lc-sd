"use client";

import React, { createContext, useState } from 'react';
import type { MessageProps } from '../components/Message';

export const chatContext = createContext({
  messages: [] as MessageProps[],
  setMessages: (messages: MessageProps[]) => {},
});

type ChatProviderProps = {
  children: React.ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  return (
    <chatContext.Provider value={{ messages, setMessages }}>
      {children}
    </chatContext.Provider>
  );
};

