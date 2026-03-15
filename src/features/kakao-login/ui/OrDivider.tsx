// Divider with "또는" text for separating social login methods
import { Text, View } from "react-native";

export function OrDivider() {
  return (
    <View className="flex-row items-center gap-3 my-6">
      <View className="flex-1 h-px bg-gray-300" />
      <Text className="text-sm font-medium text-gray-500">또는</Text>
      <View className="flex-1 h-px bg-gray-300" />
    </View>
  );
}
