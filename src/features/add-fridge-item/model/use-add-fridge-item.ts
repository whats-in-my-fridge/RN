// 냉장고 재료 추가 뮤테이션 훅

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type AddIngredientReq, postFridgeItem } from "../api/post-fridge-item";

export function useAddFridgeItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: AddIngredientReq) => postFridgeItem(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fridge"] });
    },
    onError: (error) => {
      if (__DEV__) console.error("[POST /fridge] error", error);
    },
  });
}
