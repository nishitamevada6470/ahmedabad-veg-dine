import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createActor } from "../backend";
import type { CreateReservationInput, Reservation } from "../types";

export function useCreateReservation() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateReservationInput) => {
      if (!actor) throw new Error("Backend not connected");
      const result = await actor.createReservation(
        input.name,
        input.phoneNumber,
        input.date,
        input.time,
        BigInt(input.partySize),
        input.specialRequests ?? null,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      toast.success("Table reserved! We'll see you soon.", {
        description: "Check your phone for confirmation details.",
      });
    },
    onError: (err: Error) => {
      toast.error("Reservation failed", { description: err.message });
    },
  });
}

export function useReservationsByPhone(phoneNumber: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Reservation[]>({
    queryKey: ["reservations", phoneNumber],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getReservationByPhone(phoneNumber);
    },
    enabled: !!actor && !isFetching && phoneNumber.length > 5,
  });
}
