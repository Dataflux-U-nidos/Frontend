// hooks/useUserHooks.ts
import { useQuery } from "@tanstack/react-query";
import { getStudentsByTutor } from "@/services/userService";
import { User } from "@/types";
import { QUERY_KEYS } from "@/lib/api";

export function useGetStudentsByTutor(tutorToker?: string) {
  return useQuery<User[], Error>({
    queryKey: [QUERY_KEYS.STUDENTS_BY_TUTOR, tutorToker],
    queryFn: () => {
      if (!tutorToker) throw new Error("Tutor Token no proporcionado");
      return getStudentsByTutor(tutorToker);
    },
    //only fetch if tutorToker is provided
    enabled: Boolean(tutorToker),    
    // Refetch data every 5 minutes      
    staleTime: 1000 * 60 * 5,           
  });
}
