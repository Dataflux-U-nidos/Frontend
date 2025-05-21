// src/hooks/studentTests/usePatchTestResultHook.ts
import { useCallback, useState } from "react";
import { patchTestResult } from "@/services/studentTestService";
import type { CompetencyAverages } from "@/types/testResultType";

export function usePatchTestResult() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (results: CompetencyAverages) => {
      setLoading(true);
      setError(null);
      try {
        await patchTestResult(results);
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
