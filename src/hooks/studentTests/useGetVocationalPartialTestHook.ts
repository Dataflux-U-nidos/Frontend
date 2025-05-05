import { useEffect, useState } from "react";
import { getPartialVocationalTest } from "../../services/studentTestService";

export const useVocationalPartialTest = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await getPartialVocationalTest();
        setData({ vocational: items });

      } catch (err) {
        console.error("Error loading vocational partial test:", err);
        setError("Error cargando el test");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
