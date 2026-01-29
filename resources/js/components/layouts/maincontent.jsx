// resources/js/components/layouts/MainContent.jsx
import React from 'react';
import JournalCard from "../../components/layouts/journalcard";

export default function MainContent({ messages }) {
  return (
    // 1. Menghapus items-center agar tidak memaksa semua anak ke sumbu tengah secara kaku
    <div className="flex-1 pl-80 flex flex-col bg-[#E3F2FD] pt-32 p-8 overflow-y-auto min-h-screen relative scrollbar-hide">
      
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#BBDEFB]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,1)_0%,_rgba(255,255,255,0)_70%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-transparent to-blue-200/50"></div>
      </div>

      {/* 2. Gunakan mx-auto agar container pesan selalu berada di tengah horizontal */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col">
        {messages.length === 0 ? (
          // Hero Section saat kosong
          <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-700 mt-20">
            <h1 className="text-8xl font-bold font-poppins bg-gradient-to-l from-[#000814] via-blue-700 to-blue-500 bg-clip-text text-transparent p-4">
              Nowledge
            </h1>
            <p className="text-slate-500 text-lg font-poppins font-medium">
              Start a conversation by typing a message below
            </p>
          </div>
        ) : (
          // Daftar Pesan
          <div className="w-full space-y-6">
            {messages.map((msg, index) => (
              <div key={index} className="w-full">
                {msg.type === 'journal' ? (
                  <div className="flex justify-center">
                     <JournalCard journal={msg.data} />
                  </div>
                ) : (
                  <div
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}
                  >
                    <div
                      className={`max-w-[80%] px-6 py-4 rounded-2xl shadow-md ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white/90 backdrop-blur-sm text-gray-800 border border-blue-100'
                      }`}
                    >
                      <p className="text-sm leading-relaxed font-poppins">{msg.text}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}