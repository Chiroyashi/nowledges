import React from 'react';
import { Bookmark, Quote, Link2, FileText, ThumbsDown } from 'lucide-react';

export default function JournalCard({ journal }) {
    return (
        <div className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-3xl p-6 mb-4 shadow-sm hover:shadow-md transition-all animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header: Badge Number & Title */}
            <div className="flex gap-4 mb-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
                    {journal.id}
                </div>
                <h3 className="text-lg font-bold text-slate-800 leading-tight hover:text-blue-600 cursor-pointer transition-colors border-b border-transparent hover:border-blue-600">
                    {journal.title}
                </h3>
            </div>

            {/* Key Takeaway Section */}
            <div className="ml-12 mb-4">
                <p className="text-sm text-slate-600 leading-relaxed">
                    <span className="font-bold uppercase text-[10px] tracking-wider text-slate-400 mr-2">Key Takeaway</span>
                    {journal.takeaway}
                </p>
            </div>

            {/* Tags & Meta Info */}
            <div className="ml-12 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-[10px] font-bold uppercase tracking-tight">
                    <ThumbsDown className="w-3 h-3 rotate-180" /> Highly Cited
                </div>
                
                <div className="text-xs text-slate-400 font-medium">
                    {journal.year} • <span className="text-slate-600">{journal.citations} citations</span> • {journal.author}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 ml-auto">
                    <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all">
                        <Bookmark className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all">
                        <Quote className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all">
                        <Link2 className="w-4 h-4" />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all">
                        <FileText className="w-4 h-4" /> PDF
                    </button>
                </div>
            </div>
        </div>
    );
}