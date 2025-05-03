import React from 'react';

export interface MessageProps {
  text: string;
  userType: 'user' | 'assistant';
}

const Message: React.FC<MessageProps> = ({ text, userType }) => {
  return (
    <div className={`flex mb-2 ${userType === 'user' ? 'justify-end' : 'justify-start'}`}>
      <p className={`p-2 rounded max-w-[70%] ${
        userType === 'user' 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-200 text-gray-800'
      }`}>
        {text}
      </p>
    </div>
  );
};

export default Message; 