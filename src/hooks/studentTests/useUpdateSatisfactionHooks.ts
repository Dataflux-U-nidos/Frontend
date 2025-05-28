// src/hooks/studentTests/usePatchTestResultHook.ts
import { useCallback, useState } from "react";
import { patchSatisfactionTest } from "@/services/studentTestService";
import type { satisfactionType } from "@/types/satisfactionType";

export function usePatchTestResult() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (results: satisfactionType) => {
      setLoading(true);
      setError(null);
      try {
        await patchSatisfactionTest(results);
      } catch (err: any) {
        setError(err?.message ?? "Error al enviar resultados");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { submit, loading, error };
}
