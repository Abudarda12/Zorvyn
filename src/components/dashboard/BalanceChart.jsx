import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTransactionStore } from '../../store/useTransactionStore';

const CustomFintechTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#141414] backdrop-blur-md px-5 py-4 rounded-2xl border border-[#2a2a2a] shadow-2xl">
        <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold mb-1">{label}</p>
        <p className="text-[#d49a6a] text-xl font-extrabold flex items-baseline">
          <span className="text-zinc-600 text-sm mr-1">$</span>
          {payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
      </div>
    );
  }
  return null;
};

const BalanceChart = () => {
  const transactions = useTransactionStore(state => state.transactions);
  
  const chartData = useMemo(() => {
    if (!transactions.length) return [];
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    let currentBalance = 10000;
    return sorted.map(tx => {
      if (tx.type === 'income') currentBalance += tx.amount;
      else currentBalance -= tx.amount;
      return {
        date: new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        balance: currentBalance
      };
    });
  }, [transactions]);

  if (!chartData.length) {
    return (
      <div className="h-64 flex items-center justify-center border-2 border-dashed border-[#1e1e1e] rounded-2xl px-6 py-10">
        <p className="text-zinc-600 font-medium text-sm">Awaiting transaction data...</p>
      </div>
    );
  }

  return (
    <div className="h-[280px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d49a6a" stopOpacity={0.15}/>
              <stop offset="100%" stopColor="#d49a6a" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#71717A', fontSize: 11, fontWeight: 600 }} 
            dy={10} 
            minTickGap={20}
          />
          <YAxis hide={true} domain={['dataMin - 1000', 'dataMax + 1000']} />
          <Tooltip 
            content={<CustomFintechTooltip />} 
            cursor={{ stroke: '#2a2a2a', strokeWidth: 1, strokeDasharray: '4 4' }} 
          />
          <Area 
            type="monotone" 
            dataKey="balance" 
            stroke="#d49a6a" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorBalance)" 
            animationDuration={1500}
            activeDot={{ r: 5, fill: '#d49a6a', stroke: '#111', strokeWidth: 3 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceChart;
