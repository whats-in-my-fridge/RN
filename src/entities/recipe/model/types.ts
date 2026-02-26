// Recipe entity card data types used by recipe UI components.
export type RecipeCardVariant = "banner" | "default";

export interface RecipeCardData {
  recipeId: number;
  title: string;
  thumbnail: string;
  matchRate: number;
  missingIngredients: string[];
  cookTime: string;
  difficulty: string;
  isLiked?: boolean;
}
