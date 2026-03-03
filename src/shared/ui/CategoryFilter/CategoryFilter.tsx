import { Pressable, ScrollView, Text } from "react-native";

const CATEGORIES = ["전체", "한식", "양식", "중식", "일식"] as const;

export type Category = (typeof CATEGORIES)[number];

interface CategoryFilterProps {
  selected: Category;
  onSelect: (category: Category) => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
      {CATEGORIES.map((cat) => {
        const isActive = cat === selected;
        return (
          <Pressable
            key={cat}
            onPress={() => onSelect(cat)}
            className={`rounded-tag px-4 py-2 ${
              isActive ? "bg-primary" : "border border-stroke-default bg-surface-card"
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                isActive ? "text-white" : "text-content-secondary"
              }`}
            >
              {cat}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
