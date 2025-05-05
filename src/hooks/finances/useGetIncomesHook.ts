import { useState, useEffect } from 'react';
import { financeIncomesType } from '@/types/financeIncomesType';
import { getAllIncomes } from '@/services/financeService'; // Adjust the import path as needed

interface UseAllIncomesResult {
  incomes: financeIncomesType | null;
  loading: boolean;
  error: Error | null;
}

export const useGetIncomes = (planTypes: string[]): UseAllIncomesResult => {
  const [incomes, setIncomes] = useState<financeIncomesType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchIncomes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllIncomes(planTypes);
        setIncomes(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchIncomes();
  }, [planTypes]); // Re-run when planTypes changes

  return { incomes, loading, error };
};