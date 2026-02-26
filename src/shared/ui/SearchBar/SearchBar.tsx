import { TextInput, View } from "react-native";

import { IconSymbol } from "@/shared/ui/icon-symbol";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = "레시피 또는 재료 검색...",
}: SearchBarProps) {
  return (
    <View className="flex-row items-center rounded-input border border-stroke-default bg-surface-card px-4 py-3">
      <IconSymbol name="magnifyingglass" size={20} color="#9E9E9E" style={{ marginRight: 8 }} />
      <TextInput
        className="flex-1 text-base text-content-primary"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#B0A99F"
        returnKeyType="search"
      />
    </View>
  );
}
