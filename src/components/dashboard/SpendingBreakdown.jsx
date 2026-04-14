import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTransactionStore } from '../../store/useTransactionStore';

// Zorvyn Theme adapted colors: Primary Gold, Mint Green, Vivid Purple, Bright Cyan, Slate
const COLORS = ['#d49a6a', '#10B981', '#A855F7', '#06b6d4', '#4B5563'];

const SpendingBreakdown = () => {
  const transactions = useTransactionStore(state => state.transactions);

  const data = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryTotals = expenses.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {});

    return Object.keys(categoryTotals).map((category, index) => ({
      name: category,
      value: categoryTotals[category],
      color: COLORS[index % COLORS.length]
    })).sort((a, b) => b.value - a.value);
  }, [transactions]);

  if (!data.length) {
    return (
      <div className="h-[200px] flex items-center justify-center border-2 border-dashed border-[#1e1e1e] rounded-2xl">
        <p className="text-zinc-600 font-medium text-sm">No settled expenses</p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#141414] backdrop-blur-md px-4 py-3 rounded-xl border border-[#2a2a2a] shadow-xl">
          <p className="text-zinc-400 text-[10px] uppercase font-bold tracking-widest mb-1">{payload[0].name}</p>
          <p className="text-white text-lg font-extrabold flex items-baseline">
            <span className="text-zinc-600 text-sm mr-1">₹</span>
            {payload[0].value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[280px] w-full mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={70}
            outerRadius={105}
            paddingAngle={6}
            dataKey="value"
            stroke="none"
            cornerRadius={8}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle" 
            iconSize={8}
            formatter={(value) => <span className="text-zinc-400 font-bold text-xs uppercase tracking-wider ml-1">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingBreakdown;
