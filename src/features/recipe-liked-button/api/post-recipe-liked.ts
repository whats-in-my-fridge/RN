// POST /recipes/{recipeId}/scrap (찜하기), DELETE /recipes/{recipeId}/scrap (찜하기 취소)

import { apiDelete, apiPost } from "@/shared/api";

export async function postRecipeLiked(recipeId: number, isLiked: boolean) {
  if (!recipeId || recipeId < 1) {
    throw new Error("유효하지 않은 레시피 ID입니다.");
  }

  if (__DEV__) {
    console.log(`[${isLiked ? "POST" : "DELETE"} /recipes/${recipeId}/scrap] request`);
  }

  try {
    if (isLiked) {
      await apiPost(`/recipes/${recipeId}/scrap`);
    } else {
      await apiDelete(`/recipes/${recipeId}/scrap`);
    }

    if (__DEV__) {
      console.log(`[${isLiked ? "POST" : "DELETE"} /recipes/${recipeId}/scrap] response`);
    }

    return { recipeId, isLiked };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("레시피 좋아요 요청에 실패했습니다.");
  }
}
