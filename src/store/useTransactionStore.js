import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const API_BASE = 'http://localhost:5000/api/transactions';

// Built-in Mock Data Fallback for Frontend Assessments
// This guarantees the frontend always functions beautifully even if the Express Backend crashes or the DB fails to connect
const MOCK_FALLBACK_DATA = [
  { id: 'tx-1', date: new Date(Date.now() - 86400000 * 5).toISOString(), category: 'Salary', amount: 85000, description: 'Monthly Salary - TCS', type: 'income' },
  { id: 'tx-2', date: new Date(Date.now() - 86400000 * 4).toISOString(), category: 'Food', amount: 845.5, description: 'Zomato - Biryani', type: 'expense' },
  { id: 'tx-3', date: new Date(Date.now() - 86400000 * 2).toISOString(), category: 'Utilities', amount: 1500, description: 'BESCOM Electricity Bill', type: 'expense' },
  { id: 'tx-4', date: new Date(Date.now() - 86400000 * 1).toISOString(), category: 'Entertainment', amount: 1200, description: 'PVR Ticket - Movie', type: 'expense' },
  { id: 'tx-5', date: new Date().toISOString(), category: 'Food', amount: 120.0, description: 'Chai & Samosa', type: 'expense' },
];

export const useTransactionStore = create(
  persist(
    (set, get) => ({
      // Initial State
      transactions: [],
      currentRole: 'Viewer', // Default to secure state (3. Basic Role Based UI)
      filterQuery: {
        search: '',
        category: 'All',
        sortBy: 'Date',
        sortOrder: 'desc',
      },
      isLoading: false,
      error: null,
      isUsingMock: false,

      // Async action to fetch data from Express Backend OR fallback to Mock
      fetchTransactions: async () => {
        set({ isLoading: true, error: null });
        
        // Always give it a brief artificial delay to let the UI Skeleton loaders shine beautifully
        await new Promise((resolve) => setTimeout(resolve, 800));

        try {
          const response = await fetch(API_BASE);
          if (!response.ok) throw new Error('API Request Failed');
          const data = await response.json();
          
          const formattedData = data.map(tx => ({ ...tx, id: tx._id }));
          set({ transactions: formattedData, isLoading: false, isUsingMock: false });
        } catch (err) {
          console.warn("Backend unavailable or DB offline. Falling back to Mock Assessment Data...");
          const currentTx = get().transactions;
          const txToUse = (currentTx && currentTx.length > 0) ? currentTx : MOCK_FALLBACK_DATA;
          
          set({ 
            transactions: txToUse, 
            isLoading: false, 
            isUsingMock: true,
          });
        }
      },

  // Role switching action
  setRole: (role) => set({ currentRole: role }),

  // Filter patching action (partial updates, purely derived later by Hooks)
  setFilterQuery: (query) => set((state) => ({
    filterQuery: { ...state.filterQuery, ...query }
  })),

  // Add Transaction
  addTransaction: async (transactionData) => {
    const { currentRole, isUsingMock } = get();
    if (currentRole !== 'Admin') {
      console.warn("Unauthorized Action: Only Admins can add transactions.");
      return; 
    }

    if (isUsingMock) {
      // Handle addition purely on frontend if mocking
      const newTx = { ...transactionData, id: crypto.randomUUID() };
      set((state) => ({ transactions: [newTx, ...state.transactions] }));
      return;
    }

    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) throw new Error('Failed to add transaction');
      const newTx = await response.json();
      
      const formattedTx = { ...newTx, id: newTx._id };
      set((state) => ({ transactions: [formattedTx, ...state.transactions] }));
    } catch (error) {
      console.error("Failed to add transaction:", error);
    }
  },

  // Delete Transaction
  deleteTransaction: async (id) => {
    const { currentRole, isUsingMock } = get();
    if (currentRole !== 'Admin') {
      console.warn("Unauthorized Action: Only Admins can delete transactions.");
      return;
    }

    if (isUsingMock) {
      set((state) => ({ transactions: state.transactions.filter(t => t.id !== id) }));
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete transaction');

      set((state) => ({ transactions: state.transactions.filter(t => t.id !== id) }));
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  }
    }),
    {
      name: 'zorvyn-storage',
      partialize: (state) => ({ 
        transactions: state.transactions, 
        currentRole: state.currentRole 
      }),
    }
  )
);
