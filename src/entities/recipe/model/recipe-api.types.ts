// BE API 응답 원본 타입 — Recipe 관련 DTO

/** 공통 응답 래퍼 */
export type BaseResponse<T> = {
  result: T;
};

/** 레시피 재료 DTO */
export type RecipeIngredientDTO = {
  name: string;
  amount: string | null;
  bundle: string | null;
};

/** 조리 단계 DTO */
export type RecipeStepDTO = {
  order: number;
  content: string;
  image: string;
};

/** 레시피 카드(목록) DTO */
export type RecipeDTO = {
  recipeId: number;
  title: string;
  description: string;
  mainImage: string;
  cookTime: string;
  difficulty: string;
  servings: string;
  ingredients: RecipeIngredientDTO[];
  missingIngredients: string[];
  isScrapped: boolean;
};

/** 찜 응답 DTO */
export type RecipeScrapDTO = {
  scrapId: number;
  recipeId: number;
  memberId: number;
};

/** 레시피 상세 DTO */
export type RecipeInfoDTO = {
  recipeId: number;
  title: string;
  description: string;
  mainImage: string;
  servings: string;
  cookTime: string;
  difficulty: string;
  ingredients: RecipeIngredientDTO[];
  steps: RecipeStepDTO[];
  isScrapped: boolean;
};
