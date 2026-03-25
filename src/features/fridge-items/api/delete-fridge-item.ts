// 냉장고 재료 단건 삭제 API 함수

import { apiDelete } from "@/shared/api";

export async function deleteFridgeItem(ingredientId: number): Promise<void> {
  console.log("[DELETE /fridge/:id] request", { ingredientId });
  await apiDelete(`/fridge/${ingredientId}`);
  console.log("[DELETE /fridge/:id] success", { ingredientId });
}
