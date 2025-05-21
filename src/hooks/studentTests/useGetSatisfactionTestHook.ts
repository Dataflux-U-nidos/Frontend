import { useEffect, useState } from "react";
import { getSatisfactionTest } from "../../services/studentTestService";

export const useSatisfactionTest = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await getSatisfactionTest();
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
