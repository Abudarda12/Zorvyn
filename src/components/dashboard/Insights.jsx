import React, { useMemo } from 'react';
import { useTransactionStore } from '../../store/useTransactionStore';
import { Lightbulb, TrendingUp, AlertTriangle } from 'lucide-react';

const Insights = () => {
  const transactions = useTransactionStore(state => state.transactions);

  const insights = useMemo(() => {
    if (transactions.length === 0) return [];
    const expenses = transactions.filter(t => t.type === 'expense');
    const logs = [];

    if (expenses.length > 0) {
      const catTotals = expenses.reduce((acc, tx) => {
        acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
        return acc;
      }, {});
      const highestCategory = Object.keys(catTotals).reduce((a, b) => catTotals[a] > catTotals[b] ? a : b);
      logs.push({
        icon: TrendingUp,
        color: 'text-[#ef4444]',
        bg: 'bg-[#2a0e13] border-[#ef4444]/20',
        title: 'Top Expenditure',
        description: `Your highest spend is ${highestCategory} at $${catTotals[highestCategory].toLocaleString()}.`
      });
    }

    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, tx) => sum + tx.amount, 0);
    const totalExpense = expenses.reduce((sum, tx) => sum + tx.amount, 0);
    
    if (totalIncome > 0) {
      const savingsRate = (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1);
      logs.push({
        icon: Lightbulb,
        color: 'text-[#d49a6a]',
        bg: 'bg-[#1e1a14] border-[#d49a6a]/20',
        title: 'Wealth Engine',
        description: `You are securing ${savingsRate}% of your incoming cash flow.`
      });
    }

    if (logs.length === 0) {
      logs.push({
        icon: AlertTriangle,
        color: 'text-zinc-400',
        bg: 'bg-[#1a1a1a] border-[#2a2a2a]',
        title: 'Need More Data',
        description: 'Transact to generate AI driven wealth insights.'
      });
    }
    return logs;
  }, [transactions]);

  return (
    <div className="bg-[#111111] rounded-[32px] p-8 shadow-2xl border border-[#1e1e1e]">
      <h2 className="text-lg font-bold text-white mb-6 font-sans tracking-tight">Intelligence</h2>
      <div className="space-y-4">
        {insights.map((insight, idx) => {
          const Icon = insight.icon;
          return (
            <div key={idx} className="flex p-5 rounded-2xl items-start space-x-4 border border-[#1e1e1e] bg-[#141414] hover:border-[#2a2a2a] transition-all group">
              <div className={`p-3 rounded-xl border ${insight.bg}`}>
                <Icon className={insight.color} size={18} strokeWidth={2.5} />
              </div>
              <div className="flex-1 mt-0.5">
                <h4 className="font-bold text-zinc-200 text-sm mb-1.5 tracking-tight group-hover:text-white transition-colors">{insight.title}</h4>
                <p className="text-xs text-zinc-500 font-medium leading-relaxed">{insight.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Insights;
