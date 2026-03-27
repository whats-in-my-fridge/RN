// 냉장고 재료 목록 조회 및 삭제를 위한 React Query 훅

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toFridgeItems } from "@/entities/fridge";
import { deleteFridgeItem } from "../api/delete-fridge-item";
import { getFridgeItems } from "../api/get-fridge-items";

export const FRIDGE_ITEMS_QUERY_KEY = ["fridge", "items"] as const;

/** 냉장고 재료 목록을 조회하고 FE 도메인 모델로 변환해 반환한다. */
export function useFridgeItems() {
  return useQuery({
    queryKey: FRIDGE_ITEMS_QUERY_KEY,
    queryFn: () => getFridgeItems().then(toFridgeItems),
  });
}

/** 냉장고 재료를 삭제하고 목록을 자동으로 갱신한다. */
export function useDeleteFridgeItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFridgeItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fridge"] });
    },
  });
}
