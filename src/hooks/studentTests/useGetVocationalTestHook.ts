import { useEffect, useState } from "react";
import { getVocationalTest } from "../../services/studentTestService";

export const useVocationalTest = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await getVocationalTest();
        setData({ tests: items });

      } catch (err) {
        console.error("Error loading vocational test:", err);
        setError("Error cargando el test");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
