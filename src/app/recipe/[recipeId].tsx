import { useLocalSearchParams } from "expo-router";

import { RecipeDetailPage } from "@/pages/recipe-detail/ui/RecipeDetailPage";

export default function RecipeDetailRoute() {
  const { recipeId } = useLocalSearchParams<{ recipeId: string }>();

  return <RecipeDetailPage recipeId={recipeId} />;
}
