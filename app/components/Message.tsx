import React from 'react';

export interface MessageProps {
  text: string;
  userType: 'user' | 'assistant';
}

const Message: React.FC<MessageProps> = ({ text, userType }) => {
  return (
    <div className={`flex mb-2 ${userType === 'user' ? 'justify-end' : 'justify-start'}`}>
      <p className={`py-2 px-4 rounded-2xl max-w-[70%] ${
        userType === 'user' 
          ? 'bg-primary-pure text-white' 
          : 'bg-primary-light text-gray-800'
      }`}>
        {text}
      </p>
    </div>
  );
};

export default Message; 