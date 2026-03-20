import { Pressable, Text, View } from "react-native";

import { tokens } from "@/shared/config/tokens";
import { IconSymbol } from "@/shared/ui/icon-symbol";

interface ProfileCardProps {
  nickname?: string;
  email?: string;
  onEdit?: () => void;
}

export function ProfileCard({
  nickname = "냉장고 셰프",
  email = "chef@example.com",
  onEdit,
}: ProfileCardProps) {
  return (
    <View className="flex-row items-center rounded-list border border-stroke-default bg-surface-card p-card">
      <View
        className="h-14 w-14 items-center justify-center rounded-full"
        style={{ backgroundColor: tokens.color["surface-section"] }}
      >
        <IconSymbol name="person.fill" size={28} color={tokens.color["content-secondary"]} />
      </View>
      <View className="ml-4 flex-1">
        <Text className="text-base font-bold text-content-primary">{nickname}</Text>
        <Text className="mt-0.5 text-sm text-content-secondary">{email}</Text>
      </View>
      {onEdit && (
        <Pressable
          className="rounded-button border border-stroke-default bg-surface-section px-4 py-2 active:opacity-90"
          onPress={onEdit}
        >
          <Text className="text-sm font-semibold text-content-secondary">편집</Text>
        </Pressable>
      )}
    </View>
  );
}
