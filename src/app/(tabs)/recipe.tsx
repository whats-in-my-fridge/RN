/**
 * src/app/(tabs)/recipe.tsx
 *
 * 레시피 탭 화면
 */

import { Text, View } from "react-native";

export default function RecipeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-surface-app">
      <Text className="text-content-primary text-lg">레시피</Text>
    </View>
  );
}
