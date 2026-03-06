import { Dimensions, View } from "react-native";
import { DefaultFoodCard, type RecipeCardData } from "@/entities/recipe";
import { RecipeLikedButton } from "@/features/recipe-liked-button";
import { tokens } from "@/shared/config/tokens";

const COLUMN_GAP = tokens.spacing.card;
const SCREEN_PADDING = tokens.spacing.screen;
const CARD_WIDTH = (Dimensions.get("window").width - SCREEN_PADDING * 2 - COLUMN_GAP) / 2;

interface RecipeListProps {
  recipes: RecipeCardData[];
  onPressRecipe?: (recipe: RecipeCardData) => void;
}

export function RecipeList({ recipes, onPressRecipe }: RecipeListProps) {
  return (
    <View className="flex-row flex-wrap" style={{ gap: COLUMN_GAP }}>
      {recipes.map((recipe) => (
        <View key={recipe.recipeId} style={{ width: CARD_WIDTH }}>
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
