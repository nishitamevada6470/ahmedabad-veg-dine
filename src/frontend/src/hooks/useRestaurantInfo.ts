import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { RestaurantInfo } from "../types";

export function useRestaurantInfo() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<RestaurantInfo>({
    queryKey: ["restaurantInfo"],
    queryFn: async () => {
      if (!actor) {
        return {
          name: "Sattv Restaurant",
          address: "12, Ambawadi Arcade, Ahmedabad, Gujarat 380006",
          phone: "+91 79 2658 1234",
          email: "hello@sattvrestaurant.com",
          openingHours: "Mon–Sun: 11:00 AM – 10:30 PM",
        };
      }
      return actor.getRestaurantInfo();
    },
    enabled: !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}
