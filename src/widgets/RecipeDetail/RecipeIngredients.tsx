import { Text, View } from "react-native";

import type { Ingredient } from "@/entities/recipe/model/recipe.types";

interface RecipeIngredientsProps {
  owned: Ingredient[];
  missing: Ingredient[];
}

/** 보유 재료 / 부족한 재료 섹션 */
export function RecipeIngredients({ owned, missing }: RecipeIngredientsProps) {
  return (
    <View>
      <Text className="text-lg font-bold text-content-primary">재료</Text>

      {/* 필요한 재료 */}
      <View className="mt-3">
        <Text className="text-sm font-semibold text-status-fresh">
          ✓ 필요한 재료 ({owned.length})
        </Text>
        <View className="mt-2 flex-row flex-wrap gap-2">
          {owned.map((ing) => (
            <View
              key={`${ing.name}-${ing.amount ?? ""}`}
              className="rounded-tag bg-status-fresh-bg px-3 py-1"
            >
              <Text className="text-xs text-status-fresh">
                {ing.name}
                {ing.amount ? ` ${ing.amount}` : ""}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* 부족한 재료 */}
      {missing.length > 0 && (
        <View className="mt-4">
          <Text className="text-sm font-semibold text-status-expiring">
            ✕ 부족한 재료 ({missing.length})
          </Text>
          <View className="mt-2 flex-row flex-wrap gap-2">
            {missing.map((ing) => (
              <View
                key={`${ing.name}-${ing.amount ?? ""}`}
                className="rounded-tag border border-status-expiring-border bg-status-expiring-bg px-3 py-1"
              >
                <Text className="text-xs text-status-expiring">
                  {ing.name}
                  {ing.amount ? ` ${ing.amount}` : ""}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
