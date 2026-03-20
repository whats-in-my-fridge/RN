// src/shared/ui/LoadMoreButton/index.tsx
// 더보기 버튼 — 페이지네이션에 공통으로 쓰이는 재사용 컴포넌트.

import { Pressable, Text, View } from "react-native";

import { tokens } from "@/shared/config/tokens";
import { IconSymbol } from "@/shared/ui/icon-symbol";

interface LoadMoreButtonProps {
  remaining: number;
  onPress: () => void;
}

export function LoadMoreButton({ remaining, onPress }: LoadMoreButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="mt-4 flex-row items-center justify-center gap-2 rounded-2xl border border-stroke-default bg-surface-section py-3.5"
    >
      <IconSymbol name="chevron.down" size={15} color={tokens.color["content-secondary"]} />
      <Text className="text-sm font-semibold text-content-secondary">더보기</Text>
      <View className="rounded-full bg-stroke-default px-2 py-0.5">
        <Text className="text-xs text-content-muted">{remaining}개</Text>
      </View>
    </Pressable>
  );
}
