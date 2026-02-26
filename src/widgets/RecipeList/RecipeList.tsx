import { View } from "react-native";

import type { Recipe } from "@/entities/recipe/model/recipe.types";
import { RecipeCard } from "@/shared/ui/RecipeCard";

interface RecipeListProps {
  recipes: Recipe[];
  onPressRecipe?: (recipe: Recipe) => void;
}

export function RecipeList({ recipes, onPressRecipe }: RecipeListProps) {
  return (
    <View className="flex-row flex-wrap gap-3">
      {recipes.map((recipe) => (
        <View key={recipe.id} className="w-[48%]">
          <RecipeCard recipe={recipe} onPress={() => onPressRecipe?.(recipe)} />
        </View>
      ))}
    </View>
  );
}
