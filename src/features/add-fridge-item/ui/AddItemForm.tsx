// 재료 추가 폼 — 재료명/수량/유통기한/냉장고 칸 위치 입력 필드와 추가 버튼을 조립
// API 미연동 단계: 추가하기 버튼은 시트 닫기만 수행

import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import type { ShelfType } from "@/entities/fridge";
import { tokens } from "@/shared/config/tokens";
import type { SelectOption } from "@/shared/ui/select-input";
import { SelectInput } from "@/shared/ui/select-input";

// ─── 상수 ────────────────────────────────────────────────────────────────────

const SHELF_OPTIONS: SelectOption<ShelfType>[] = [
  { label: "신선 보관 선반", value: "fresh-storage" },
  { label: "주식 · 조리식품 (좌)", value: "chilled-left" },
  { label: "소스 · 음료 (우)", value: "chilled-right" },
  { label: "야채 서랍", value: "vegetable-drawer" },
  { label: "냉동 서랍", value: "freezer" },
];

const INITIAL_FORM = {
  name: "",
  quantity: "",
  expiryDays: "7",
  shelfType: null as ShelfType | null,
};

// ─── 로컬 헬퍼: label + TextInput 패턴 반복 제거 ─────────────────────────────

type LabeledInputProps = {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "number-pad";
  returnKeyType?: "next" | "done";
};

function LabeledInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  returnKeyType = "next",
}: LabeledInputProps) {
  return (
    <View className="gap-[6px]">
      <Text className="text-xs font-medium leading-[18px] text-content-secondary">{label}</Text>
      <BottomSheetTextInput
        className="h-[47px] rounded-input border border-stroke-default bg-surface-section px-4 text-sm text-content-primary"
        placeholder={placeholder}
        placeholderTextColor={tokens.color["content-muted"]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
      />
    </View>
  );
}

// ─── AddItemForm ──────────────────────────────────────────────────────────────

type Props = {
  onClose: () => void;
};

export function AddItemForm({ onClose }: Props) {
  const [form, setForm] = useState(INITIAL_FORM);

  const isSubmittable =
    form.name.trim().length > 0 &&
    form.quantity.trim().length > 0 &&
    form.expiryDays.trim().length > 0 &&
    form.shelfType !== null;

  function handleSubmit() {
    // TODO: API 연동 시 mutation 호출로 교체
    onClose();
  }

  return (
    <View className="px-5 pb-2">
      <Text className="mb-6 text-xl font-bold text-content-primary">재료 추가</Text>

      <View className="gap-4">
        <LabeledInput
          label="재료명"
          value={form.name}
          onChangeText={(v) => setForm((s) => ({ ...s, name: v }))}
          placeholder="예: 닭가슴살"
        />

        {/* 수량 + 유통기한 — 2열 */}
        <View className="flex-row gap-3">
          <View className="flex-1">
            <LabeledInput
              label="수량"
              value={form.quantity}
              onChangeText={(v) => setForm((s) => ({ ...s, quantity: v }))}
              placeholder="예: 1개"
            />
          </View>
          <View className="flex-1">
            <LabeledInput
              label="유통기한 (일)"
              value={form.expiryDays}
              onChangeText={(v) => setForm((s) => ({ ...s, expiryDays: v.replace(/[^0-9]/g, "") }))}
              placeholder="7"
              keyboardType="number-pad"
              returnKeyType="done"
            />
          </View>
        </View>

        <SelectInput<ShelfType>
          label="냉장고 칸 위치"
          placeholder="칸을 선택하세요"
          options={SHELF_OPTIONS}
          value={form.shelfType}
          onChange={(v) => setForm((s) => ({ ...s, shelfType: v }))}
        />
      </View>

      {/* 추가하기 버튼 */}
      <Pressable
        onPress={handleSubmit}
        disabled={!isSubmittable}
        className="mt-8 h-[52px] items-center justify-center rounded-card"
        style={{
          backgroundColor: isSubmittable
            ? tokens.color["content-primary"]
            : tokens.color["content-muted"],
          shadowColor: tokens.color["content-primary"],
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: isSubmittable ? 0.25 : 0,
          shadowRadius: 12,
          elevation: isSubmittable ? 6 : 0,
        }}
      >
        <Text className="text-base font-bold text-white">추가하기</Text>
      </Pressable>
    </View>
  );
}
