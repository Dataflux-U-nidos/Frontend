import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getMajorComments, createComment } from "@/services/majorService"
import { QUERY_KEYS } from "@/lib/api/constants"
import { useNotify } from "@/hooks/useNotify"

export const useGetMajorComments = (majorId: string) =>
    useQuery({
        queryKey: [QUERY_KEYS.MAJOR_COMMENTS, majorId],
        queryFn: () => getMajorComments(majorId),
        enabled: !!majorId,
    })

export const useCreateComment = (majorId: string) => {
    const qc = useQueryClient()
    const { notifyError } = useNotify()

    return useMutation({
        mutationFn: (text: string) => createComment({ majorId, text }),
        onMutate: async (text) => {
            // optimistic update
            await qc.cancelQueries({ queryKey: [QUERY_KEYS.MAJOR_COMMENTS, majorId] })
            const prev = qc.getQueryData<any>([QUERY_KEYS.MAJOR_COMMENTS, majorId])
            qc.setQueryData<any>([QUERY_KEYS.MAJOR_COMMENTS, majorId], (old = []) => [
                ...old,
                {
                    id: `temp-${Date.now()}`,
                    userId: "me",
                    majorId,
                    text,
                    createdAt: new Date().toISOString(),
                },
            ])
            return { prev }
        },
        onError: (_, __, ctx) => {
            qc.setQueryData([QUERY_KEYS.MAJOR_COMMENTS, majorId], ctx?.prev)
            notifyError({
                title: "Error",
                description: "No se pudo publicar el comentario.",
                icon: "❌",
                closeButton: true,
            })
        },
        onSettled: () =>
            qc.invalidateQueries({ queryKey: [QUERY_KEYS.MAJOR_COMMENTS, majorId] }),
    })
}
