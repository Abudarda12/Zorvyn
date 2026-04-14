import React, { useState } from 'react';
import { useTransactionStore } from '../../store/useTransactionStore';
import { Home, PieChart, Wallet, Settings, Bell, ChevronDown } from 'lucide-react';

const SidebarIcon = ({ icon: Icon, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`p-3 rounded-2xl transition-all duration-300 ${active ? 'bg-[#1e1e1e] text-[#d49a6a] shadow-[0_0_15px_rgba(212,154,106,0.1)] border border-[#d49a6a]/20' : 'text-zinc-600 hover:text-zinc-300 hover:bg-[#1a1a1a]'}`}
  >
    <Icon size={24} strokeWidth={active ? 2.5 : 2} />
  </button>
);

const DashboardLayout = ({ children }) => {
  const { currentRole, setRole } = useTransactionStore();
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <div className="min-h-screen bg-[#070707] flex flex-col md:flex-row font-sans selection:bg-[#d49a6a] selection:text-black">
      
      {/* Sidebar / Bottom Nav */}
      <aside className="w-full md:w-24 border-t md:border-t-0 md:border-r border-[#1a1a1a] bg-[#0c0c0c] flex flex-row md:flex-col items-center py-0 md:py-8 justify-around md:justify-between z-20 h-16 md:h-screen fixed bottom-0 md:relative">
        <div className="hidden md:flex w-12 h-12 bg-gradient-to-br from-[#d49a6a] to-[#a6754b] rounded-2xl items-center justify-center shadow-[0_0_20px_rgba(212,154,106,0.3)] mb-8 cursor-pointer">
          <Wallet size={24} color="black" strokeWidth={2.5} />
        </div>
        <div className="flex flex-row md:flex-col space-x-6 md:space-x-0 md:space-y-6 md:mt-8 items-center justify-center w-full md:w-auto px-6 md:px-0 h-full md:h-auto">
          <SidebarIcon icon={Home} active={activeTab === 'Home'} onClick={() => setActiveTab('Home')} />
          <SidebarIcon icon={PieChart} active={activeTab === 'PieChart'} onClick={() => setActiveTab('PieChart')} />
          <SidebarIcon icon={Settings} active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-[calc(100vh-4rem)] md:h-screen overflow-y-auto relative pb-16 md:pb-0">
        
        {/* Top Header */}
        <header className="h-auto min-h-[6rem] md:h-24 px-4 md:px-10 py-4 md:py-0 flex flex-col md:flex-row items-center justify-between sticky top-0 bg-[#070707]/80 backdrop-blur-2xl z-10 border-b border-[#1a1a1a] gap-4 md:gap-0">
          <div className="w-full md:w-auto flex justify-between items-center text-center md:text-left">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">Overview</h1>
              <p className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-[0.2em] mt-1">Zorvyn Financials</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 md:space-x-6 w-full md:w-auto justify-between md:justify-end overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <button 
              onClick={() => alert("No new notifications currently!")} 
              className="relative p-2 flex-shrink-0 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <Bell size={22} />
              <span className="absolute top-1 right-2 w-2 h-2 bg-[#d49a6a] rounded-full border border-[#070707] shadow-[0_0_8px_rgba(212,154,106,0.8)]"></span>
            </button>

            <div className="hidden md:block h-8 w-px bg-zinc-800"></div>

            <div 
              onClick={() => alert("Profile settings are coming soon in v1.1.0!")} 
              className="flex flex-shrink-0 items-center space-x-3 cursor-pointer group"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#d49a6a] to-[#a6754b] p-[2px]">
                <div className="bg-[#141414] rounded-full w-full h-full p-[2px]">
                  <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Profile" className="w-full h-full rounded-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              </div>
              <div className="flex items-center hidden sm:flex">
                <span className="text-xs font-bold text-zinc-300 pr-2">ABUDARDA</span>
                <ChevronDown size={14} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
              </div>
            </div>

            {/* Quick Role Switcher */}
            <select 
              className="ml-2 md:ml-4 bg-[#111111] border border-[#2a2a2a] rounded-xl px-2 md:px-4 py-2 text-[10px] uppercase tracking-widest font-extrabold focus:ring-1 focus:ring-[#d49a6a] focus:border-[#d49a6a] outline-none text-zinc-300 cursor-pointer hover:bg-[#1a1a1a] transition w-28 md:w-36 shadow-sm appearance-none text-center flex-shrink-0"
              value={currentRole}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Admin">🛡️ Admin</option>
              <option value="Viewer">👁️ Viewer</option>
            </select>
          </div>
        </header>

        {/* Content Layout */}
        <div className="p-4 md:p-10 pt-6 md:pt-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
