import React from 'react';

interface MessageProps {
  text: string;
}

const Message: React.FC<MessageProps> = ({ text }) => {
  return (
    <div className="text-right mb-2">
      <p className="bg-gray-200 p-2 rounded">{text}</p>
    </div>
  );
};

export default Message; 