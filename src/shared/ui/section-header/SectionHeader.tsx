// SectionHeader: reusable section title row with an optional "더보기" button.
import { Pressable, Text, View } from "react-native";

interface SectionHeaderProps {
  title: string;
  onMore?: () => void;
}

export function SectionHeader({ title, onMore }: SectionHeaderProps) {
  return (
    <View className="mb-3 flex-row items-center justify-between px-screen">
      <Text className="text-lg font-extrabold text-content-primary">{title}</Text>
      {onMore && (
        <Pressable onPress={onMore}>
          <Text className="text-sm font-medium text-content-secondary">더보기 &gt;</Text>
        </Pressable>
      )}
    </View>
  );
}
