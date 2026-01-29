// resources/js/components/pages/index.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/layouts/sidebar";
import MainContent from "../../components/layouts/maincontent";
import ChatBar from "../../components/layouts/chatbar";

export default function NowledgeApp() {
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load chat history saat komponen dimuat
  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const response = await fetch('/api/chat/history');
      const data = await response.json();
      setChatHistory(data);
    } catch (error) {
      // Fallback data jika API Laravel belum siap
      setChatHistory([
        'Dampak AI pada Dosen',
        'Metodologi Kualitatif Kom',
        'Studi Literatur LIMS',
        'ChatGPT identify'
      ]);
    }
  };

  const handleSelectChat = (chatTitle) => {
    // Simulasi membuka chat history
    setMessages([
      { sender: 'user', text: `Menampilkan history: ${chatTitle}` },
      { sender: 'ai', text: 'Ini adalah hasil pencarian lama yang disimpan di database.' }
    ]);
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  /**
   * LOGIKA UTAMA: Kirim pesan dan munculkan Jurnal
   * @param {string} messageText - Teks dari input chat
   * @param {array} filters - Daftar filter yang dipilih user
   */
  const handleSendMessage = (messageText, filters) => {
    // 1. Tambahkan pesan user ke UI
    setMessages(prev => [...prev, { sender: 'user', text: messageText }]);
    setLoading(true);

    // 2. Simulasi loading lalu tampilkan hasil jurnal sesuai foto referensi
    setTimeout(() => {
      const journalResponse = {
        type: 'journal', // Trigger MainContent untuk merender JournalCard
        data: {
          id: messages.filter(m => m.type === 'journal').length + 1,
          title: "Data collection and quality challenges in deep learning: a data-centric AI perspective",
          takeaway: "Data collection and quality are crucial for deep learning, with data validation, cleaning, and integration techniques playing a crucial role in improving performance and addressing bias and fairness issues.",
          year: 2021,
          citations: 430,
          author: "Steven Euijong Whang et al.",
        }
      };
      
      setMessages(prev => [...prev, journalResponse]);
      setLoading(false);
    }, 1000);
  };

  return (
    // Background dasar biru muda agar selaras dengan sidebar melayang
    <div className="flex h-screen w-full overflow-hidden bg-[#BBDEFB] font-poppins">
      
      {/* Sidebar Melayang di sisi kiri (w-80) */}
      <Sidebar 
        chatHistory={chatHistory}
        onSelectChat={handleSelectChat} 
        onNewChat={handleNewChat}
      />

      {/* Area Konten Utama */}
      <div className="flex-1 flex flex-col relative h-full">
        {/* MainContent merender gelembung chat atau JournalCard */}
        <MainContent messages={messages} isLoading={loading} />
        
        {/* ChatBar dengan fitur transisi posisi.
            isNewChat akan 'true' jika belum ada pesan, membuat ChatBar berada di tengah
        */}
        <ChatBar 
          onSendMessage={handleSendMessage} 
          isNewChat={messages.length === 0} 
        />
      </div>
    </div>
  );
}