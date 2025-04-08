import { useEffect, useState } from 'react';

import supabase from '@/api/supabase';

function useGetTable<T = unknown>(tableName: string) {
  const [tableData, setTableData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data, error } = await supabase.from(tableName).select('*');
      if (error) {
        setError(error);
        setTableData([]);
      } else {
        setTableData(data ?? []);
      }
      setLoading(false);
    }

    if (tableName) {
      fetchData();
    }
  }, [tableName]);

  return { tableData, loading, error };
}

export { useGetTable };
