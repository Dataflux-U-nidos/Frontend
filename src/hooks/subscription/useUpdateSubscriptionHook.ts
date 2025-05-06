import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSubscription } from "@/services/subscriptionService";
import { UpdateSubscriptionInput } from "@/types/SubscriptionType";

export const useUpdateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    Error,
    { id: string; updates: UpdateSubscriptionInput }
  >({
    mutationFn: ({ id, updates }) => updateSubscription(id, updates),
    onSuccess: (_data, variables) => {
      // refrescar listado
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      // refrescar detalle individual
      queryClient.invalidateQueries({
        queryKey: ["subscription", variables.id],
      });
    },
    onError: (error) => {
      console.error("Error al actualizar  de suscripción:", error);
    },
  });
};
