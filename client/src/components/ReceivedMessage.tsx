import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ReceivedMessageProps {
  receivedChat: string;
}

const ReceivedMessage: React.FC<ReceivedMessageProps> = ({ receivedChat }) => {
  return (
    <div className="bg-gray-200 text-black p-3 rounded-lg max-w-[80%] self-start mb-2">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {receivedChat}
      </ReactMarkdown>
    </div>
  );
};

export default ReceivedMessage;
