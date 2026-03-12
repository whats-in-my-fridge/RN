import { useQuery } from "@tanstack/react-query";
import { getScraps } from "../api/get-scraps";

export function useScraps() {
  return useQuery({
    queryKey: ["scraps"],
    queryFn: getScraps,
  });
}
