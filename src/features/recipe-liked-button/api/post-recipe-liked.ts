// 레시피 찜하기/취소 API 호출 — RecipeLikedButton에서 사용
import { scrapRecipe, unscrapRecipe } from "@/entities/recipe";

export async function postRecipeLiked(recipeId: number, isLiked: boolean) {
  if (isLiked) {
    const result = await scrapRecipe(recipeId);
    return { recipeId: result.recipeId, isLiked: true };
  }
  await unscrapRecipe(recipeId);
  return { recipeId, isLiked: false };
}
