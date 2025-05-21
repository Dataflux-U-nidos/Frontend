// src/hooks/studentTests/usePatchTestResultHook.ts
import { useCallback, useState } from "react";
import { patchGradesResult } from "@/services/studentTestService";
import type { GradeFormType } from "@/types/gradeFormType";

export function usePatchGradesResult() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (payload: GradeFormType) => {
      setLoading(true);
      setError(null);
      try {
        console.log("Update Grades Result Payload:");
        await patchGradesResult(payload);
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
