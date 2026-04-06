import React, { useMemo } from 'react';
import { useTransactionStore } from '../../store/useTransactionStore';
import { ArrowUpRight, ArrowDownRight, Gem } from 'lucide-react';

const SummaryCards = () => {
  const transactions = useTransactionStore(state => state.transactions);

  const stats = useMemo(() => {
    let income = 0; let expenses = 0;
    transactions.forEach(tx => {
      if (tx.type === 'income') income += tx.amount;
      else expenses += tx.amount;
    });
    return { totalBalance: income - expenses, income, expenses };
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {/* Total Balance - CRED Gold Style */}
      <div className="bg-gradient-to-br from-[#1c1c1c] to-[#111111] border border-[#d49a6a]/20 rounded-[28px] p-7 shadow-[0_8px_40px_rgb(0,0,0,0.4)] relative overflow-hidden group hover:border-[#d49a6a]/50 transition-colors duration-500">
        <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#d49a6a] opacity-[0.03] rounded-full blur-3xl group-hover:opacity-[0.08] transition-opacity duration-700"></div>
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl flex items-center justify-center">
            <Gem size={22} className="text-[#d49a6a]" />
          </div>
          <span className="font-bold text-zinc-500 uppercase tracking-[0.2em] text-[10px]">Core Balance</span>
        </div>
        <h3 className="text-4xl font-extrabold text-white tracking-tighter mt-2 flex items-baseline">
          <span className="text-zinc-600 text-2xl mr-1">$</span>
          {stats.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </h3>
      </div>

      {/* Income */}
      <div className="bg-[#111111] border border-[#1e1e1e] hover:border-[#2a2a2a] transition-colors rounded-[28px] p-7 shadow-2xl flex flex-col justify-between">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-[#0a1f16] rounded-2xl flex items-center justify-center border border-[#10B981]/20">
            <ArrowUpRight size={22} className="text-[#10B981]" />
          </div>
          <span className="font-bold text-zinc-500 uppercase tracking-[0.2em] text-[10px]">Net Income</span>
        </div>
        <h3 className="text-4xl font-bold text-white tracking-tighter flex items-baseline">
          <span className="text-zinc-700 text-2xl mr-1">$</span>
          {stats.income.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </h3>
      </div>

      {/* Expenses */}
      <div className="bg-[#111111] border border-[#1e1e1e] hover:border-[#2a2a2a] transition-colors rounded-[28px] p-7 shadow-2xl flex flex-col justify-between">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-[#2a0e13] rounded-2xl flex items-center justify-center border border-[#ef4444]/20">
            <ArrowDownRight size={22} className="text-[#ef4444]" />
          </div>
          <span className="font-bold text-zinc-500 uppercase tracking-[0.2em] text-[10px]">Total Settled</span>
        </div>
        <h3 className="text-4xl font-bold text-white tracking-tighter flex items-baseline">
          <span className="text-zinc-700 text-2xl mr-1">$</span>
          {stats.expenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </h3>
      </div>
    </div>
  );
};
export default SummaryCards;
