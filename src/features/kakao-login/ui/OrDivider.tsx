// Divider with "또는" text for separating social login methods
import { Text, View } from "react-native";

export function OrDivider() {
  return (
    <View className="flex-row items-center gap-md my-lg">
      <View className="flex-1 h-px bg-stroke-default" />
      <Text className="text-sm font-medium text-content-secondary px-md">또는</Text>
      <View className="flex-1 h-px bg-stroke-default" />
    </View>
  );
}
