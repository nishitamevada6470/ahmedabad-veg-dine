import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { MenuItem } from "../types";

export function useMenuItems() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<MenuItem[]>({
    queryKey: ["menuItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMenuItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useVegetarianItems() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<MenuItem[]>({
    queryKey: ["vegetarianItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVegetarianItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMenuItemsByCategory(category: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<MenuItem[]>({
    queryKey: ["menuItems", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMenuItemsByCategory(category);
    },
    enabled: !!actor && !isFetching && !!category,
  });
}
