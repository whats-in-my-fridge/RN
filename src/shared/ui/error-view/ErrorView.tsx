// Error view component for displaying error states.
import { Text, View } from "react-native";

interface ErrorViewProps {
  message?: string;
  height?: string;
}

export function ErrorView({
  message = "요청을 처리할 수 없습니다",
  height = "h-56",
}: ErrorViewProps) {
  return (
    <View className={`${height} items-center justify-center rounded-2xl bg-surface-card`}>
      <Text className="text-sm text-content-secondary">{message}</Text>
    </View>
  );
}
