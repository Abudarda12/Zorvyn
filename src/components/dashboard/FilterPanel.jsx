import React, { useState } from 'react';
import { useTransactionStore } from '../../store/useTransactionStore';
import { Search, ListFilter, ArrowDownUp } from 'lucide-react';

const FilterPanel = () => {
  const filterQuery = useTransactionStore(state => state.filterQuery);
  const setFilterQuery = useTransactionStore(state => state.setFilterQuery);
  const addTransaction = useTransactionStore(state => state.addTransaction);
  const currentRole = useTransactionStore(state => state.currentRole);

  const categories = ['All', 'Food', 'Salary', 'Utilities', 'Entertainment', 'Others'];
  const [simulatedLoad, setSimulatedLoad] = useState(false);

  const handleAddDemoTx = () => {
    setSimulatedLoad(true);
    setTimeout(() => {
      addTransaction({
        date: new Date().toISOString(),
        category: 'Food',
        amount: 35.00,
        description: 'Cred Pay - Dining',
        type: 'expense'
      });
      setSimulatedLoad(false);
    }, 400);
  };

  return (
    <div className="bg-[#111111] rounded-[32px] p-8 shadow-2xl border border-[#1e1e1e]">
      <h2 className="text-lg font-bold text-white mb-6 flex items-center font-sans tracking-tight">
        <ListFilter className="mr-3 text-[#d49a6a]" size={20} /> Parameters
      </h2>

      <div className="space-y-7">
        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#d49a6a] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search statements..." 
            className="w-full pl-12 pr-4 py-3.5 bg-[#171717] border border-[#2a2a2a] rounded-xl text-sm font-bold placeholder-zinc-600 focus:border-[#d49a6a]/50 focus:ring-1 focus:ring-[#d49a6a]/50 outline-none text-white transition-all shadow-inner"
            value={filterQuery.search}
            onChange={(e) => setFilterQuery({ search: e.target.value })}
          />
        </div>

        {/* Categories */}
        <div>
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4 block">Categories</label>
          <div className="flex flex-wrap gap-2.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterQuery({ category: cat })}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border ${
                  filterQuery.category === cat 
                  ? 'bg-[#d49a6a] text-black border-[#d49a6a] shadow-[0_0_15px_rgba(212,154,106,0.3)]' 
                  : 'bg-[#141414] text-zinc-400 border-[#2a2a2a] hover:border-zinc-600 hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sorting Engine */}
        <div>
           <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4 block">Order By</label>
           <div className="flex gap-3">
              <select 
                className="flex-1 bg-[#171717] border border-[#2a2a2a] rounded-xl px-4 py-3.5 text-sm font-bold focus:border-[#d49a6a]/50 focus:ring-1 focus:ring-[#d49a6a]/50 outline-none text-zinc-200 cursor-pointer shadow-inner appearance-none"
                value={filterQuery.sortBy}
                onChange={(e) => setFilterQuery({ sortBy: e.target.value })}
              >
                <option value="Date">Date Settled</option>
                <option value="Amount">Transaction Value</option>
              </select>
              
              <button 
                onClick={() => setFilterQuery({ sortOrder: filterQuery.sortOrder === 'asc' ? 'desc' : 'asc' })}
                className="p-3.5 bg-[#171717] border border-[#2a2a2a] text-zinc-400 hover:text-[#d49a6a] hover:border-[#d49a6a]/40 rounded-xl transition-all shadow-inner group"
              >
                <ArrowDownUp size={18} className={filterQuery.sortOrder === 'asc' ? 'rotate-180 transition-transform duration-500' : 'transition-transform duration-500'} />
              </button>
           </div>
        </div>

        {/* Admin Demo Button */}
        <div className="pt-6 mt-4 block">
           {currentRole === 'Admin' ? (
             <button 
              onClick={handleAddDemoTx}
              disabled={simulatedLoad}
              className="w-full bg-[#d49a6a] text-black rounded-xl py-4 font-extrabold hover:bg-[#e6a978] transition-all shadow-[0_0_20px_rgba(212,154,106,0.25)] flex justify-center items-center text-sm tracking-wide"
             >
               {simulatedLoad ? 'Authorizing...' : 'Pay with Cred'}
             </button>
           ) : (
            <div className="w-full bg-[#141414] text-zinc-600 border border-dashed border-[#2a2a2a] rounded-xl py-4 font-bold flex justify-center text-xs tracking-wider">
              🛡️ Admin Access Required
            </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
