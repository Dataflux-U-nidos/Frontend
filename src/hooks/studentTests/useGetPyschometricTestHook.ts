// src/hooks/usePsychometricTest.ts
import { useEffect, useState } from "react";
import { getPsychometricTest } from "../../services/studentTestService";

export const usePsychometricTest = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPsychometricTest();
        setData(result.schema.psicometric);
        console.log("Psychometric Test Data:", result.schema.psicometric);
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
