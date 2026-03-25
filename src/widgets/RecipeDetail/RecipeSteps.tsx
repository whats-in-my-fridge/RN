import { Image, Text, View } from "react-native";

import type { CookingStep } from "@/entities/recipe/model/recipe.types";
import { tokens } from "@/shared/config/tokens";
import { IconSymbol } from "@/shared/ui/icon-symbol";

interface RecipeStepsProps {
  steps: CookingStep[];
}

/** 조리 순서 섹션 */
export function RecipeSteps({ steps }: RecipeStepsProps) {
  return (
    <View>
      <Text className="text-lg font-bold text-content-primary">조리 순서</Text>
      {steps.length === 0 ? (
        <Text className="mt-4 text-sm text-content-muted">조리 순서 정보가 없습니다.</Text>
      ) : (
        <View className="mt-4 gap-6">
          {steps.map((s) => (
            <View key={s.step} className="flex-row gap-3">
              {/* 스텝 번호 */}
              <View className="h-8 w-8 items-center justify-center rounded-full bg-primary">
                <Text className="text-sm font-bold text-white">{s.step}</Text>
              </View>
              {/* 스텝 설명 */}
              <View className="flex-1">
                <Text className="text-sm leading-5 text-content-primary">{s.description}</Text>
                {s.duration > 0 && (
                  <View className="mt-1 flex-row items-center gap-1">
                    <IconSymbol name="clock" size={12} color={tokens.color["content-secondary"]} />
                    <Text className="text-xs text-content-secondary">{s.duration}분</Text>
                  </View>
                )}
                {s.imageUrl && (
                  <Image
                    source={{ uri: s.imageUrl }}
                    className="mt-3 aspect-video w-full rounded-card"
                    resizeMode="cover"
                  />
                )}
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
