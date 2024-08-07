import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface NewReceivedMessageProps {
  receivedChat: string;
}

function NewReceivedMessage({ receivedChat }: NewReceivedMessageProps) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + receivedChat[index]);
      index += 1;
      if (index === receivedChat.length) {
        clearInterval(intervalId);
      }
    }, 30);

    return () => clearInterval(intervalId);
  }, [receivedChat]);

  return (
    <div className="bg-gray-200 text-black p-3 rounded-lg max-w-[80%] self-start mb-2">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {displayedText}
      </ReactMarkdown>
    </div>
  );
}

export default NewReceivedMessage;
