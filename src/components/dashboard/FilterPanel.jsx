import React, { useState } from 'react';
import { useTransactionStore } from '../../store/useTransactionStore';
import { Search, ListFilter, ArrowDownUp, X } from 'lucide-react';

const FilterPanel = () => {
  const filterQuery = useTransactionStore(state => state.filterQuery);
  const setFilterQuery = useTransactionStore(state => state.setFilterQuery);
  const addTransaction = useTransactionStore(state => state.addTransaction);
  const currentRole = useTransactionStore(state => state.currentRole);

  const categories = ['All', 'Food', 'Salary', 'Utilities', 'Entertainment', 'Others'];
  const formCategories = ['Food', 'Salary', 'Utilities', 'Entertainment', 'Others'];
  const [simulatedLoad, setSimulatedLoad] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ description: '', amount: '', category: 'Food', type: 'expense' });

  const handleExportCSV = () => {
    const transactions = useTransactionStore.getState().transactions;
    const csvRows = [];
    csvRows.push(['ID', 'Date', 'Category', 'Amount', 'Description', 'Type'].join(','));
    transactions.forEach(tx => {
      csvRows.push([tx.id, tx.date, tx.category, tx.amount, `"${tx.description}"`, tx.type].join(','));
    });
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'Zorvyn_Export.csv');
    a.click();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;
    setSimulatedLoad(true);
    setShowModal(false);
    setTimeout(() => {
      addTransaction({
        date: new Date().toISOString(),
        category: formData.category,
        amount: parseFloat(formData.amount),
        description: formData.description,
        type: formData.category === 'Salary' ? 'income' : formData.type
      });
      setSimulatedLoad(false);
      setFormData({ description: '', amount: '', category: 'Food', type: 'expense' });
    }, 400);
  };

  return (
    <>
      <div className="bg-[#111111] rounded-[32px] p-5 md:p-8 shadow-2xl border border-[#1e1e1e]">
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
             <div className="flex flex-col sm:flex-row gap-3">
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

          {/* Admin Demo & Export Buttons */}
          <div className="pt-6 mt-4 flex gap-3">
             {currentRole === 'Admin' ? (
               <button 
                onClick={() => setShowModal(true)}
                disabled={simulatedLoad}
                className="flex-1 bg-[#d49a6a] text-black rounded-xl py-4 font-extrabold hover:bg-[#e6a978] transition-all shadow-[0_0_20px_rgba(212,154,106,0.25)] flex justify-center items-center text-xs tracking-wide"
               >
                 {simulatedLoad ? 'Authorizing...' : '+ Add Entry'}
               </button>
             ) : (
              <div className="flex-1 bg-[#141414] text-zinc-600 border border-dashed border-[#2a2a2a] rounded-xl py-4 font-bold flex justify-center items-center text-xs tracking-wider cursor-not-allowed">
                🛡️ Admin Required
              </div>
             )}
             <button 
               onClick={handleExportCSV}
               className="flex-1 bg-[#171717] border border-[#2a2a2a] text-zinc-300 hover:text-white rounded-xl py-4 font-bold hover:bg-[#1a1a1a] transition-all flex justify-center items-center text-xs tracking-wide"
             >
               Export CSV
             </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070707]/90 backdrop-blur-sm p-4">
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-[32px] p-8 shadow-2xl w-full max-w-md relative">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold text-white mb-6 tracking-tight">New Transaction</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Description</label>
                <input required type="text" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="e.g. Swiggy Instamart" className="w-full px-4 py-3 bg-[#171717] border border-[#2a2a2a] rounded-xl text-sm font-bold text-white focus:border-[#d49a6a] outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Amount (₹)</label>
                <input required type="number" step="0.01" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} placeholder="e.g. 500" className="w-full px-4 py-3 bg-[#171717] border border-[#2a2a2a] rounded-xl text-sm font-bold text-white focus:border-[#d49a6a] outline-none" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 bg-[#171717] border border-[#2a2a2a] rounded-xl text-sm font-bold text-white focus:border-[#d49a6a] outline-none appearance-none cursor-pointer">
                    {formCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Type</label>
                  <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-3 bg-[#171717] border border-[#2a2a2a] rounded-xl text-sm font-bold text-white focus:border-[#d49a6a] outline-none appearance-none cursor-pointer">
                    <option value="expense">Expense (-)</option>
                    <option value="income">Income (+)</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-[#d49a6a] text-black rounded-xl py-4 font-extrabold hover:bg-[#e6a978] transition-all mt-6 shadow-[0_0_20px_rgba(212,154,106,0.25)]">
                Save Transaction
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPanel;
