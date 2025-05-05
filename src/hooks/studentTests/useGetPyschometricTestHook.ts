import { useEffect, useState } from "react";
import { getPsychometricTest } from "../../services/studentTestService";

export const usePsychometricTest = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await getPsychometricTest();
        setData({ tests: items });

      } catch (err) {
        console.error("Error loading psychometric test:", err);
        setError("Error cargando el test");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
