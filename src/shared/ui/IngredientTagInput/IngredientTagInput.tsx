// src/shared/ui/IngredientTagInput/IngredientTagInput.tsx
// 재료 태그 입력 컴포넌트.
// 엔터로 태그 추가. '-오이'처럼 '-'로 시작하면 제외 태그(빨간색), 그 외는 포함 태그(초록색).

import { useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { tokens } from "@/shared/config/tokens";
import { IconSymbol } from "@/shared/ui/icon-symbol";

export interface IngredientTag {
  id: string;
  label: string;
  type: "include" | "exclude";
}

interface IngredientTagInputProps {
  tags: IngredientTag[];
  onAddTag: (tag: IngredientTag) => void;
  onRemoveTag: (id: string) => void;
  placeholder?: string;
}

const INCLUDE_BG = tokens.color["tag-bg"];
const INCLUDE_TEXT = tokens.color["tag-text"];
const EXCLUDE_BG = tokens.color["status-expiring-bg"];
const EXCLUDE_TEXT = tokens.color["status-expiring"];

export function IngredientTagInput({
  tags,
  onAddTag,
  onRemoveTag,
  placeholder = "재료 입력 후 엔터 (예: 마늘, -오이)",
}: IngredientTagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<TextInput>(null);

  function handleSubmit() {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const isExclude = trimmed.startsWith("-");
    const label = isExclude ? trimmed.slice(1).trim() : trimmed;
    if (!label) return;

    onAddTag({
      id: `${Date.now()}-${label}`,
      label,
      type: isExclude ? "exclude" : "include",
    });
    setInputValue("");
  }

  return (
    <View
      className="rounded-input border border-stroke-default bg-surface-card px-4 py-3"
      style={{ minHeight: 48 }}
    >
      <View className="flex-row flex-wrap items-center gap-2">
        {tags.map((tag) => {
          const isExclude = tag.type === "exclude";
          const bg = isExclude ? EXCLUDE_BG : INCLUDE_BG;
          const color = isExclude ? EXCLUDE_TEXT : INCLUDE_TEXT;
          return (
            <View
              key={tag.id}
              className="flex-row items-center gap-1 rounded-full px-3 py-1"
              style={{ backgroundColor: bg }}
            >
              {isExclude && <Text style={{ fontSize: 12, fontWeight: "700", color }}>−</Text>}
              <Text style={{ fontSize: 13, fontWeight: "500", color }}>{tag.label}</Text>
              <Pressable onPress={() => onRemoveTag(tag.id)} hitSlop={8}>
                <IconSymbol name="xmark" size={11} color={color} />
              </Pressable>
            </View>
          );
        })}

        <TextInput
          ref={inputRef}
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={handleSubmit}
          placeholder={tags.length === 0 ? placeholder : ""}
          placeholderTextColor={tokens.color["content-muted"]}
          returnKeyType="done"
          blurOnSubmit={false}
          className="text-base text-content-primary"
          style={{ minWidth: 120, flex: 1 }}
        />
      </View>
    </View>
  );
}
