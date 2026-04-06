import { useMemo } from 'react';
import { useTransactionStore } from '../store/useTransactionStore';

export const useFilteredTransactions = () => {
  // We grab the strictly needed state to prevent unnecessary re-renders
  const transactions = useTransactionStore((state) => state.transactions);
  const filterQuery = useTransactionStore((state) => state.filterQuery);

  // useMemo ensures we only recalculate derived state when the dependencies change, saving performance!
  const filteredAndSorted = useMemo(() => {
    let result = [...transactions];

    // 1. Search Filter (by description)
    if (filterQuery.search.trim()) {
      const lowerQuery = filterQuery.search.toLowerCase();
      result = result.filter((tx) => 
        tx.description.toLowerCase().includes(lowerQuery)
      );
    }

    // 2. Category Filter
    if (filterQuery.category !== 'All') {
      result = result.filter((tx) => tx.category === filterQuery.category);
    }

    // 3. Sorting
    result.sort((a, b) => {
      let comparison = 0;
      if (filterQuery.sortBy === 'Date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        comparison = dateA - dateB;
      } else if (filterQuery.sortBy === 'Amount') {
        comparison = a.amount - b.amount;
      }

      return filterQuery.sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [transactions, filterQuery]); // Dependencies

  return filteredAndSorted;
};
