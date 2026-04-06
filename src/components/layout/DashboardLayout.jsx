import React from 'react';
import { useTransactionStore } from '../../store/useTransactionStore';
import { Home, PieChart, Wallet, Settings, Bell, ChevronDown } from 'lucide-react';

const SidebarIcon = ({ icon: Icon, active }) => (
  <button className={`p-3 rounded-2xl transition-all duration-300 ${active ? 'bg-[#1e1e1e] text-[#d49a6a] shadow-[0_0_15px_rgba(212,154,106,0.1)] border border-[#d49a6a]/20' : 'text-zinc-600 hover:text-zinc-300 hover:bg-[#1a1a1a]'}`}>
    <Icon size={24} strokeWidth={active ? 2.5 : 2} />
  </button>
);

const DashboardLayout = ({ children }) => {
  const { currentRole, setRole } = useTransactionStore();

  return (
    <div className="min-h-screen bg-[#070707] flex font-sans selection:bg-[#d49a6a] selection:text-black">
      
      {/* Sidebar */}
      <aside className="w-24 border-r border-[#1a1a1a] bg-[#0c0c0c] flex flex-col items-center py-8 justify-between z-20 h-screen">
        <div className="w-12 h-12 bg-gradient-to-br from-[#d49a6a] to-[#a6754b] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(212,154,106,0.3)] mb-8 cursor-pointer">
          <Wallet size={24} color="black" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col space-y-6 flex-1 mt-8">
          <SidebarIcon icon={Home} active />
          <SidebarIcon icon={PieChart} />
          <SidebarIcon icon={Settings} />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        
        {/* Top Header */}
        <header className="h-24 px-10 flex items-center justify-between sticky top-0 bg-[#070707]/80 backdrop-blur-2xl z-10 border-b border-[#1a1a1a]">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Overview</h1>
            <p className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-[0.2em] mt-1">Stash Financials</p>
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-zinc-500 hover:text-zinc-300 transition-colors">
              <Bell size={22} />
              <span className="absolute top-1 right-2 w-2 h-2 bg-[#d49a6a] rounded-full border border-[#070707] shadow-[0_0_8px_rgba(212,154,106,0.8)]"></span>
            </button>

            <div className="h-8 w-px bg-zinc-800"></div>

            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d49a6a] to-[#a6754b] p-[2px]">
                <div className="bg-[#141414] rounded-full w-full h-full p-[2px]">
                  <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Profile" className="w-full h-full rounded-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-xs font-bold text-zinc-300 pr-2">ABUDARDA</span>
                <ChevronDown size={14} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
              </div>
            </div>

            {/* Quick Role Switcher */}
            <select 
              className="ml-4 bg-[#111111] border border-[#2a2a2a] rounded-xl px-4 py-2 text-[10px] uppercase tracking-widest font-extrabold focus:ring-1 focus:ring-[#d49a6a] focus:border-[#d49a6a] outline-none text-zinc-300 cursor-pointer hover:bg-[#1a1a1a] transition w-36 shadow-sm appearance-none text-center"
              value={currentRole}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Admin">🛡️ Admin</option>
              <option value="Viewer">👁️ Viewer</option>
            </select>
          </div>
        </header>

        {/* Content Layout */}
        <div className="p-10 pt-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
