// resources/js/components/Sidebar.jsx
import React from 'react';
import { MessageSquare, User, HelpCircle, Settings, LogOut } from 'lucide-react';

// Tambahkan onSelectChat ke dalam props
export default function Sidebar({ chatHistory, onNewChat, onSelectChat }) {
  return (
    <div className="fixed left-10 top-6 bottom-10 w-80 bg-slate-50/90 backdrop-blur-md flex flex-col shadow-2xl border border-slate-200 rounded-3xl overflow-hidden z-20">
      
      {/* Header */}
      <div className="p-5 pt-1">
        <div className="flex justify-center text-3xl font-bold font-poppins bg-gradient-to-l from-[#000814] via-blue-700 to-blue-500 bg-clip-text text-transparent p-4">
          Nowledge
        </div>
        <button
          onClick={onNewChat}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg active:scale-95"
        >
          <span className="text-xl">+</span> New Chat
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
        <h3 className="text-xs text-slate-400 text-8xl tracking-widest mb-1 px-2 font-poppins">
          History Chat
        </h3>        
        <div className="space-y-2">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              // Memicu navigasi ke chat yang dipilih
              onClick={() => onSelectChat(chat)} 
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 cursor-pointer transition-all group border border-transparent hover:border-blue-100"
            >
              <MessageSquare className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
              <span className="text-sm text-slate-600 group-hover:text-blue-700 truncate font-medium font-poppins">
                {chat}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Menu */}
      <div className="border-t border-slate-200 p-4 space-y-1 bg-slate-50/50">
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-blue-50 text-slate-600 hover:text-blue-700 transition-colors">
          <User className="w-4 h-4" />
          <span className="text-sm font-medium font-poppins">Profile user</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-blue-50 text-slate-600 hover:text-blue-700 transition-colors">
          <HelpCircle className="w-4 h-4" />
          <span className="text-sm font-medium font-poppins">Updates & FAQ</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-blue-50 text-slate-600 hover:text-blue-700 transition-colors">
          <Settings className="w-4 h-4" />
          <span className="text-sm font-medium font-poppins">Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors mt-2">
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium font-poppins">Logout</span>
        </button>
      </div>
    </div>
  );
}