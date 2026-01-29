import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Mic, Plus, ChevronDown, ChevronRight, X, Trash2,
  Image as ImageIcon, Paperclip, Database, Calendar
} from 'lucide-react';

export default function ChatBar({ onSendMessage, isNewChat }) {
  const [message, setMessage] = useState('');
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [openFilter, setOpenFilter] = useState(null); 
  const [indexingStep, setIndexingStep] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const menuRef = useRef(null);
  const filterRef = useRef(null);

  const filterOptions = {
    Field: ['Agriculture & Forestry', 'Applied Sciences & Professions', 'Arts, Design & Architecture', 'Business & Management', 'Computer Science & IT', 'Education & Training', 'Engineering & Technology'],
    Indexing: {
      levels: ['Level 1', 'Level 2', 'Level 3', 'Level 4'],
      sources: ['Scopus', 'non-Scopus']
    },
    Methodology: ['Quantitative', 'Qualitative', 'Mix methods'],
    Language: ['English (UK)', 'English (US)', 'French', 'Indonesian', 'Japanese'],
    Year: [] 
  };

  const addFilter = (category, value) => {
    const filterId = `${category}: ${value}`;
    if (!selectedFilters.includes(filterId)) {
      setSelectedFilters([...selectedFilters, filterId]);
    }
    setOpenFilter(null);
    setIndexingStep(null);
  };

  const removeFilter = (filterToRemove) => {
    setSelectedFilters(selectedFilters.filter(f => f !== filterToRemove));
  };

  useEffect(() => {
    if (openFilter !== 'Indexing') setIndexingStep(null);
  }, [openFilter]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) setShowPlusMenu(false);
      if (filterRef.current && !filterRef.current.contains(event.target)) setOpenFilter(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message, selectedFilters);
      setMessage('');
    }
  };

  return (
    <div className={`fixed left-80 right-0 flex flex-col items-center bg-transparent pointer-events-none z-50 font-poppins transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) ${isNewChat ? 'bottom-[20%]' : 'bottom-8'}`}>
      <div className="w-full max-w-4xl pointer-events-auto relative px-8 flex flex-col items-center">

        {/* --- SELECTED CHIPS --- */}
        {selectedFilters.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-3 animate-in fade-in slide-in-from-bottom-2">
            {selectedFilters.map((filter) => (
              <div key={filter} className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 text-white rounded-full text-[10px] font-bold shadow-sm border border-blue-500">
                {filter}
                <button onClick={() => removeFilter(filter)} className="hover:bg-blue-700 rounded-full p-0.5"><X className="w-3 h-3" /></button>
              </div>
            ))}
            <button onClick={() => setSelectedFilters([])} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
          </div>
        )}

        {/* --- THE MAIN SINGLE SHAPE --- */}
        <div className="w-full bg-white/90 backdrop-blur-xl border border-gray-200 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-visible transition-all focus-within:ring-4 focus-within:ring-blue-500/10">
          
          {/* 1. TOP SECTION: FILTERS */}
          <div className="flex items-center px-6 py-3 gap-2 border-b border-gray-100/80 bg-gray-50/30 rounded-t-[2.5rem]" ref={filterRef}>
            {Object.keys(filterOptions).map((category) => (
              <div key={category} className="relative">
                <button
                  onClick={() => setOpenFilter(openFilter === category ? null : category)}
                  className={`px-4 py-1.5 rounded-2xl text-[12px] font-bold transition-all flex items-center gap-1.5 border
                    ${openFilter === category 
                      ? 'text-blue-600 bg-white border-blue-200 shadow-sm' 
                      : 'text-gray-500 bg-white/50 border-gray-200/60 hover:border-blue-300 hover:bg-white hover:text-blue-500'}
                  `}
                >
                  {category === 'Year' && <Calendar className="w-3.5 h-3.5" />}
                  {category}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${openFilter === category ? 'rotate-180' : 'opacity-40'}`} />
                </button>

                {/* Dropdown Filter & Year Pop-out */}
                {openFilter === category && (
                  <div className={`absolute bottom-full pb-5 mb-4 bg-white border border-gray-100 rounded-3xl shadow-2xl animate-in fade-in zoom-in slide-in-from-bottom-4 duration-300 z-[60] ${category === 'Year' ? 'w-[450px] -left-10' : 'w-64'}`}>
                    <div className="p-4">
                      {category === 'Year' ? (
                        /* --- JOURNAL ARTICLE TREND --- */
                        <div className="flex flex-col items-center">
                          <h2 className="text-[#1a73e8] text-2xl font-semibold mb-6">Journal Article Trend</h2>
                          <div className="flex gap-2 mb-1 scale-90">
                            <div className="flex items-center gap-1"><div className="w-10 h-1 bg-[#4285f4]"></div><span className="text-[10px] text-gray-600">AI Research</span></div>
                            <div className="flex items-center gap-1"><div className="w-10 h-1 bg-[#d93025]"></div><span className="text-[10px] text-gray-600">AI Writing</span></div>
                          </div>
                          <div className="relative w-full h-52 px-10 pb-8">
                            <div className="absolute inset-0 flex flex-col justify-between py-1 px-8 opacity-20 pointer-events-none">
                              {[200, 150, 100, 50, 0].map(v => (
                                <div key={v} className="relative w-full border-t border-gray-800">
                                  <span className="absolute -left-8 -top-2 text-[10px] text-gray-600 font-medium">{v}</span>
                                </div>
                              ))}
                            </div>
                            <svg className="absolute inset-0 w-full h-full px-8 overflow-visible" viewBox="0 0 300 150">
                              <path d="M 0 40 L 150 100 L 300 135" fill="none" stroke="#d93025" strokeWidth="3" />
                              <circle cx="0" cy="40" r="5" fill="#d93025" onClick={() => addFilter('Year', '2020')} />
                              <circle cx="150" cy="100" r="5" fill="#d93025" onClick={() => addFilter('Year', '2021')} />
                              <circle cx="300" cy="135" r="5" fill="#d93025" onClick={() => addFilter('Year', '2022')} />
                            </svg>
                            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-6 pt-2 font-semibold text-gray-700">
                              {['2020', '2021', '2022'].map(y => (
                                <span key={y} className="cursor-pointer hover:text-blue-600 text-sm" onClick={() => addFilter('Year', y)}>{y}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* --- INDEXING POP-OUT SIDEWAYS --- */
                        <div className="max-h-80 p-1">
                          {category === 'Indexing' ? (
                            <div className="flex flex-col gap-1.5 relative">
                              {filterOptions.Indexing.levels.map((level) => (
                                <div key={level} className="relative group">
                                  <button 
                                    onClick={() => setIndexingStep(indexingStep === level ? null : level)}
                                    className={`w-full flex items-center justify-between px-4 py-3 text-sm rounded-xl transition-all font-semibold ${
                                      indexingStep === level 
                                        ? 'bg-blue-600 text-white shadow-lg' 
                                        : 'text-gray-700 hover:bg-blue-50'
                                    }`}
                                  >
                                    {level} 
                                    <ChevronRight className={`w-4 h-4 transition-transform ${indexingStep === level ? 'rotate-0 translate-x-1' : ''}`} />
                                  </button>
                                  
                                  {/* FLOATING SUB-MENU (Di Luar Shape Utama) */}
                                  {indexingStep === level && (
                                    <div className="absolute left-[105%] top-0 w-48 p-2 bg-white border border-gray-100 rounded-[1rem] shadow-2xl flex flex-col gap-1.5 animate-in fade-in zoom-in slide-in-from-left-4 duration-200 z-[100]">
                                      <div className="px-3 py-1 text-[10px] font-black text-blue-500 uppercase tracking-wider opacity-60">Source</div>
                                      {filterOptions.Indexing.sources.map((src) => (
                                        <button 
                                          key={src} 
                                          onClick={() => addFilter('Indexing', `${level} - ${src}`)} 
                                          className="w-full mb-2 text-left px-5 py-2.5 text-[13px] bg-gray-50 hover:bg-blue-600 text-gray-700 hover:text-white rounded-xl font-bold transition-all shadow-sm border border-gray-100 hover:border-blue-500"
                                        >
                                          {src}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            /* DEFAULT FOR FIELD, METHODOLOGY, ETC */
                            <div className="flex flex-col gap-1">
                              {filterOptions[category].map(item => (
                                <button key={item} onClick={() => addFilter(category, item)} className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 rounded-xl text-gray-700 font-medium transition-colors">{item}</button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 2. BOTTOM SECTION: TEXT INPUT */}
          <div className="relative flex items-center p-2">
            <input 
              type="text" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
              placeholder="Ask Nowledge anything..." 
              className="w-full px-6 py-4 pr-44 focus:outline-none text-gray-700 bg-transparent font-medium placeholder:text-gray-400 text-[15px]" 
            />
            <div className="absolute right-4 flex items-center gap-1" ref={menuRef}>
              
              {showPlusMenu && (
                <div className="absolute bottom-full right-16 mb-4 w-52 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl p-2 animate-in fade-in zoom-in slide-in-from-bottom-4 duration-200 z-[70]">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium group"><ImageIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />Upload image</button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium group"><Paperclip className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />Upload file</button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium group border-t border-gray-50 mt-1 pt-2"><Database className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />Add from Drive</button>
                </div>
              )}

              <button onClick={() => setShowPlusMenu(!showPlusMenu)} className={`p-2 rounded-full transition-all ${showPlusMenu ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:bg-gray-100'}`}><Plus className={`w-5 h-5 transition-transform duration-300 ${showPlusMenu ? 'rotate-45' : ''}`} /></button>
              <Mic className="w-5 h-5 text-gray-400 mx-1 cursor-pointer hover:text-gray-600" />
              <button onClick={handleSend} className={`p-2.5 rounded-2xl transition-all active:scale-90 ${message.trim() ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-300'}`}><Send className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}