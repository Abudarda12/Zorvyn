import React from 'react';
import { useFilteredTransactions } from '../../hooks/useFilteredTransactions';
import { useTransactionStore } from '../../store/useTransactionStore';
import RoleGuard from '../shared/RoleGuard';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Coffee, Briefcase, Zap, Film, Box } from 'lucide-react';

const CategoryIcon = ({ category }) => {
  const configs = {
    Food: { icon: Coffee, colors: 'bg-[#1e1a14] text-[#d49a6a] border-[#362615]' },
    Salary: { icon: Briefcase, colors: 'bg-[#0a1f16] text-[#10B981] border-[#0a3523]' },
    Utilities: { icon: Zap, colors: 'bg-[#0e1629] text-[#3B82F6] border-[#15274d]' },
    Entertainment: { icon: Film, colors: 'bg-[#1d1222] text-[#A855F7] border-[#381a4a]' },
    Others: { icon: Box, colors: 'bg-[#141414] text-zinc-400 border-[#2a2a2a]' }
  };
  const config = configs[category] || configs.Others;
  const Icon = config.icon;
  
  return (
    <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center border ${config.colors}`}>
      <Icon size={18} strokeWidth={2.5} />
    </div>
  );
};

const TransactionList = () => {
  const transactions = useFilteredTransactions();
  const deleteTransaction = useTransactionStore(state => state.deleteTransaction);
  const isLoading = useTransactionStore(state => state.isLoading);
  const error = useTransactionStore(state => state.error);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1,2,3].map(i => (
          <div key={i} className="flex items-center p-4 animate-pulse bg-[#141414] border border-[#1e1e1e] rounded-2xl">
            <div className="w-12 h-12 bg-[#222] rounded-[18px] mr-4"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-[#222] rounded w-1/3"></div>
              <div className="h-3 bg-[#1a1a1a] rounded w-1/4"></div>
            </div>
            <div className="h-4 bg-[#222] rounded w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-[#2a0e13] rounded-2xl border border-[#ef4444]/20">
        <p className="text-rose-500 font-semibold text-sm">{error}</p>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="p-16 text-center rounded-[24px] border border-dashed border-[#2a2a2a] flex flex-col items-center bg-[#0c0c0c]">
        <Box size={40} className="text-zinc-700 mb-4" strokeWidth={1} />
        <h3 className="text-zinc-300 font-bold mb-1">No Transactions Found</h3>
        <p className="text-zinc-600 text-sm">No records match your query.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {transactions.map((tx) => (
          <motion.div 
            key={tx.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            whileHover={{ scale: 1.005 }}
            className="group flex items-center justify-between p-[18px] bg-[#141414] hover:bg-[#181818] rounded-2xl transition-all border border-[#1e1e1e] hover:border-[#333] hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center space-x-4">
              <CategoryIcon category={tx.category} />
              <div>
                <h4 className="font-bold text-zinc-100 text-[15px] tracking-tight">{tx.description}</h4>
                <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider mt-1">
                  {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} <span className="opacity-50 mx-1">•</span> {tx.category}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <span className={`font-extrabold text-[15px] ${tx.type === 'income' ? 'text-emerald-400' : 'text-zinc-200'}`}>
                {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              
              <RoleGuard requireAdmin={true} fallback={<div className="w-8 h-8"></div>}>
                <button 
                  onClick={() => deleteTransaction(tx.id)}
                  className="p-2.5 text-zinc-600 hover:text-rose-400 hover:bg-[#2a0e13] border border-transparent hover:border-rose-500/20 rounded-xl transition-all outline-none"
                >
                  <Trash2 size={16} strokeWidth={2.5} />
                </button>
              </RoleGuard>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TransactionList;
