// 냉장고 재료 추가 뮤테이션 훅

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FRIDGE_ITEMS_QUERY_KEY } from "@/features/fridge-items";
import { type AddIngredientReq, postFridgeItem } from "../api/post-fridge-item";

export function useAddFridgeItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: AddIngredientReq) => postFridgeItem(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FRIDGE_ITEMS_QUERY_KEY });
    },
  });
}
