// GET /users/me/scraps - 스크랩(좋아요)한 레시피 목록
import type { RecipeCardData } from "@/entities/recipe";
import { apiGet } from "@/shared/api";

type UserScrapsRes = {
  message: string;
  result: {
    scrapList: Array<{
      recipeId: number;
      title: string;
      thumbnailUrl: string;
    }>;
  };
};

export async function getScraps(): Promise<RecipeCardData[]> {
  if (__DEV__) console.log("[GET /users/me/scraps] request");
  const data = await apiGet<UserScrapsRes>("/users/me/scraps");
  if (__DEV__) console.log("[GET /users/me/scraps] response", JSON.stringify(data, null, 2));

  return data.result.scrapList.map((scrap) => ({
    recipeId: scrap.recipeId,
    title: scrap.title,
    thumbnail: scrap.thumbnailUrl,
    category: "카테고리",
    matchRate: 0,
    missingIngredients: [],
    cookTime: "0분",
    difficulty: "정보없음",
    isLiked: true,
  }));
}
