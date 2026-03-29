// Shared ingredient chip row for banner/default recipe card variants.
import { Text, View } from "react-native";

interface IngredientChipsRowProps {
  labels: string[];
  overflowCount: number;
  variant: "banner" | "default";
}

export function IngredientChipsRow({ labels, overflowCount, variant }: IngredientChipsRowProps) {
  const isBanner = variant === "banner";
  const chipContainerClassName = isBanner
    ? "max-w-[90px] rounded-full bg-surface-card px-3 py-1.5"
    : "max-w-[96px] rounded-full bg-surface-card/95 px-3 py-1.5";
  const overflowChipClassName = isBanner
    ? "rounded-full bg-surface-section px-3 py-1.5"
    : "rounded-full bg-surface-section/95 px-3 py-1.5";

  return (
    <>
      {labels.map((label, index) => (
        <View key={`${index}-${label}`} className={chipContainerClassName}>
          <Text className="text-sm font-semibold text-content-dark" numberOfLines={1}>
            {label}
          </Text>
        </View>
      ))}

      {overflowCount > 0 ? (
        <View className={overflowChipClassName}>
          <Text className="text-sm font-semibold text-content-secondary">+{overflowCount}</Text>
        </View>
      ) : null}
    </>
  );
}
