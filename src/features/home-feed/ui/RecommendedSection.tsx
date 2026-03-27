// Recommended recipes section with direct data fetching (Suspense-ready).
import { Text, View } from "react-native";
import { RecipeList } from "@/widgets/RecipeList";
import { useRecommendedRecipes } from "../model/use-recommended-recipes";

export function RecommendedSection() {
  const recommendedRecipes = useRecommendedRecipes();

  if (!recommendedRecipes || recommendedRecipes.length === 0) {
    return (
      <View className="h-56 items-center justify-center rounded-lg bg-white">
        <Text className="text-sm text-content-secondary">현재 만들 수 있는 레시피가 없습니다</Text>
      </View>
    );
  }

  return <RecipeList recipes={recommendedRecipes} />;
}
