import React, { useEffect } from 'react';
import { useTransactionStore } from './store/useTransactionStore';
import DashboardLayout from './components/layout/DashboardLayout';
import BalanceChart from './components/dashboard/BalanceChart';
import TransactionList from './components/dashboard/TransactionList';
import FilterPanel from './components/dashboard/FilterPanel';
import SummaryCards from './components/dashboard/SummaryCards';
import SpendingBreakdown from './components/dashboard/SpendingBreakdown';
import Insights from './components/dashboard/Insights';

function App() {
  const fetchTransactions = useTransactionStore((state) => state.fetchTransactions);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <DashboardLayout>
      <SummaryCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column - Main Dashboard Area */}
        <div className="col-span-1 xl:col-span-2 flex flex-col space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Balance Visuals */}
            <div className="bg-[#111111] rounded-[32px] p-8 shadow-2xl border border-[#1e1e1e]">
              <h2 className="text-lg font-bold text-white mb-2 font-sans tracking-tight">Balance Trend</h2>
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-[0.2em] mb-4">Historical Projection</p>
              <BalanceChart />
            </div>

             {/* Spending Breakdown Session */}
             <div className="bg-[#111111] rounded-[32px] p-8 shadow-2xl border border-[#1e1e1e] flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold text-white mb-2 font-sans tracking-tight">Distribution</h2>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-[0.2em] mb-4">Expense Analysis</p>
              </div>
              <SpendingBreakdown />
            </div>
          </div>

          {/* Transaction Cards List */}
          <div className="bg-[#111111] rounded-[32px] p-8 shadow-2xl border border-[#1e1e1e] flex-1">
            <div className="flex justify-between items-center mb-8 border-b border-[#1e1e1e] pb-4">
              <div>
                <h2 className="text-lg font-bold text-white font-sans tracking-tight">Statement</h2>
                <p className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-[0.2em] mt-1">Recent Activities</p>
              </div>
            </div>
            <TransactionList />
          </div>
        </div>

        {/* Right Column - Filters & Actions */}
        <div className="col-span-1 space-y-8">
          <FilterPanel />
          <Insights />
        </div>

      </div>
    </DashboardLayout>
  );
}

export default App;
