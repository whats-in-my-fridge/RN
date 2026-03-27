// Recipe entity card data types used by recipe UI components.
export type RecipeCardVariant = "banner" | "default";

export interface RecipeCardData {
  recipeId: number;
  title: string;
  mainImage: string;
  category?: string;
  matchRate?: number;
  allIngredients?: string[];
  missingIngredients: string[];
  cookTime?: string;
  difficulty?: string;
  isLiked?: boolean;
}
