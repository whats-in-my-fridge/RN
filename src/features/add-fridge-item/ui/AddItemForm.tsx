// 재료 추가 폼 — 재료명/수량 입력 필드와 추가 버튼 조립

import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { tokens } from "@/shared/config/tokens";
import { useAddFridgeItem } from "../model/use-add-fridge-item";

// ─── 상수 ────────────────────────────────────────────────────────────────────

type FridgeItemFormState = {
  name: string;
  quantity: string;
};

const INITIAL_FORM: FridgeItemFormState = {
  name: "",
  quantity: "",
};

// ─── 로컬 헬퍼: label + TextInput 패턴 반복 제거 ─────────────────────────────

type LabeledInputProps = {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  returnKeyType?: "next" | "done";
};

function LabeledInput({
  label,
  value,
  onChangeText,
  placeholder,
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
  const { mutate: addItem, isPending } = useAddFridgeItem();

  const isSubmittable = form.name.trim().length > 0 && form.quantity.trim().length > 0;

  function handleSubmit() {
    if (!isSubmittable) return;
    addItem({ name: form.name.trim(), quantity: form.quantity.trim() }, { onSuccess: onClose });
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

        <LabeledInput
          label="수량"
          value={form.quantity}
          onChangeText={(v) => setForm((s) => ({ ...s, quantity: v }))}
          placeholder="예: 1개"
          returnKeyType="done"
        />
      </View>

      {/* 추가하기 버튼 */}
      <Pressable
        onPress={handleSubmit}
        disabled={!isSubmittable || isPending}
        className={`mt-8 h-[52px] items-center justify-center rounded-card ${isSubmittable ? "bg-content-primary" : "bg-content-muted"}`}
        style={{
          shadowColor: tokens.color["content-primary"],
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: isSubmittable ? 0.25 : 0,
          shadowRadius: 12,
          elevation: isSubmittable ? 6 : 0,
        }}
      >
        <Text className="text-base font-bold text-white">
          {isPending ? "추가 중..." : "추가하기"}
        </Text>
      </Pressable>
    </View>
  );
}
