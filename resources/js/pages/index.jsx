// resources/js/components/NowledgeApp.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layouts/sidebar'; 
import MainContent from '../components/layouts/maincontent';
import ChatBar from '../components/layouts/chatbar';

export default function NowledgeApp() {
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load chat history from Laravel API
  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const response = await fetch('/api/chat/history');
      const data = await response.json();
      setChatHistory(data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      // Fallback to default data
      setChatHistory([
        'Dampak AI pada Dosen',
        'Metodologi Kualitatif Kom',
        'Lorem Ipsum Dolor Sit Am',
        'Lorem Ipsum Dolor Sit Am',
        'Lorem Ipsum Dolor Sit Am',
        'Lorem Ipsum Dolor Sit Am'
      ]);
    }
  };

  const handleNewChat = async () => {
    setMessages([]);
    // Optional: Call API to create new chat session
    try {
      await fetch('/api/chat/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        }
      });
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  const handleSendMessage = async (messageText) => {
    const userMessage = {
      sender: 'user',
      text: messageText
    };
    
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      // Send message to Laravel backend
      const response = await fetch('/api/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({
          message: messageText
        })
      });

      const data = await response.json();
      
      const aiMessage = {
        sender: 'ai',
        text: data.response || 'Sorry, I could not process your request.'
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback response
      const aiMessage = {
        sender: 'ai',
        text: 'Sorry, there was an error connecting to the server.'
      };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar 
        chatHistory={chatHistory} 
        onNewChat={handleNewChat}
      />

      <div className="flex-1 flex flex-col relative">
        <MainContent messages={messages} />
        <ChatBar onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}