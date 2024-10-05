'use client';

import { useState, useEffect } from 'react';
import { getUserInfo } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sidebar } from '@/components/ui/sidebar';

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const info = await getUserInfo();
      setUserInfo(info);
    };
    fetchUserInfo();
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, { type: 'user', content: message }]);
      // Here you would typically send the message to your AI backend
      // and then add the response to the chat history
      setMessage('');
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar userInfo={userInfo} />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded ${msg.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                {msg.content}
              </span>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <div className="flex">
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 mr-2"
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
}