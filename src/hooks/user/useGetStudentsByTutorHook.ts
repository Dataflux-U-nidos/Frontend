// hooks/useUserHooks.ts
import { useQuery } from "@tanstack/react-query";
import { getStudentsByTutor } from "@/services/userService";
import { User } from "@/types";
import { QUERY_KEYS } from "@/lib/api";

export function useGetStudentsByTutor(tutorId?: string) {
  return useQuery<User[], Error>({
    queryKey: [QUERY_KEYS.STUDENTS_BY_TUTOR, tutorId],
    queryFn: () => {
      if (!tutorId) throw new Error("Tutor ID no proporcionado");
      return getStudentsByTutor(tutorId);
    },
    //only fetch if tutorId is provided
    enabled: Boolean(tutorId),    
    // Refetch data every 5 minutes      
    staleTime: 1000 * 60 * 5,           
  });
}
