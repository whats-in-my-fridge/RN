import { View } from "react-native";

import { DefaultFoodCard, type RecipeCardData } from "@/entities/recipe";
import { RecipeLikedButton } from "@/features/recipe-liked-button";

interface RecipeListProps {
  recipes: RecipeCardData[];
  onPressRecipe?: (recipe: RecipeCardData) => void;
}

export function RecipeList({ recipes, onPressRecipe }: RecipeListProps) {
  return (
    <View className="flex-row flex-wrap gap-3">
      {recipes.map((recipe) => (
        <View key={recipe.recipeId} className="w-[48%]">
          <DefaultFoodCard
            recipe={recipe}
            onPress={() => onPressRecipe?.(recipe)}
            likeButton={
              <RecipeLikedButton recipeId={recipe.recipeId} initialLiked={recipe.isLiked} />
            }
          />
        </View>
      ))}
    </View>
  );
}
