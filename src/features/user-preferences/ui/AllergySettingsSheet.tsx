// 알레르기 설정 바텀시트 — 알레르기 태그 목록 표시, 추가/삭제 인터랙션을 제공한다.

import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, View } from "react-native";

import { tokens } from "@/shared/config/tokens";
import { BottomSheet } from "@/shared/ui/bottom-sheet";
import { useAddAllergy, useRemoveAllergy } from "../api/use-preferences-mutations";
import { usePreferencesStore } from "../model/use-preferences-store";

// ─── 상수 ────────────────────────────────────────────────────────────────────

const SHEET_SNAP_POINTS = ["50%"];
const MAX_INPUT_LENGTH = 30;

// ─── AllergyTag ───────────────────────────────────────────────────────────────

type AllergyTagProps = {
  label: string;
  onRemove: () => Promise<void>;
  isLoading?: boolean;
};

function AllergyTag({ label, onRemove, isLoading }: AllergyTagProps) {
  async function handlePress() {
    await onRemove();
  }

  return (
    <View className="flex-row items-center gap-1 rounded-full border border-stroke-default bg-surface-section px-3 py-1.5">
      <Text className="text-sm text-content-primary">{label}</Text>
      <Pressable onPress={handlePress} hitSlop={8} disabled={isLoading}>
        <Text
          className={`text-sm font-bold ${isLoading ? "text-content-disabled" : "text-content-muted"}`}
        >
          ×
        </Text>
      </Pressable>
    </View>
  );
}

// ─── AllergySettingsContent ───────────────────────────────────────────────────

type AllergySettingsContentProps = {
  onClose: () => void;
};

function AllergySettingsContent({ onClose }: AllergySettingsContentProps) {
  const { allergies } = usePreferencesStore();
  const [input, setInput] = useState("");

  const addMutation = useAddAllergy();
  const removeMutation = useRemoveAllergy();

  const isLoading = addMutation.isPending || removeMutation.isPending;
  const isAddable = input.trim().length > 0 && !isLoading;

  async function handleAdd() {
    if (!isAddable) return;
    try {
      await addMutation.mutateAsync(input.trim());
      setInput("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "알레르기 추가에 실패했습니다";
      Alert.alert("오류", message);
    }
  }

  async function handleRemove(allergy: string) {
    try {
      await removeMutation.mutateAsync(allergy);
    } catch (error) {
      const message = error instanceof Error ? error.message : "알레르기 삭제에 실패했습니다";
      Alert.alert("오류", message);
    }
  }

  return (
    <View className="px-5 pb-4">
      <Text className="mb-6 text-xl font-bold text-content-primary">알레르기 설정</Text>

      {/* 현재 알레르기 태그 목록 */}
      {allergies.length > 0 ? (
        <ScrollView
          horizontal={false}
          showsVerticalScrollIndicator={false}
          className="mb-5 max-h-40"
        >
          <View className="flex-row flex-wrap gap-2">
            {allergies.map((allergy) => (
              <AllergyTag
                key={allergy}
                label={allergy}
                onRemove={() => handleRemove(allergy)}
                isLoading={isLoading}
              />
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="mb-5 items-center py-6">
          <Text className="text-sm text-content-muted">등록된 알레르기가 없습니다.</Text>
        </View>
      )}

      {/* 입력 필드 + 추가 버튼 */}
      <Text className="mb-1.5 text-xs font-medium text-content-secondary">알레르기 추가</Text>
      <View className="flex-row items-center gap-2">
        <BottomSheetTextInput
          className="h-[47px] flex-1 rounded-input border border-stroke-default bg-surface-section px-4 text-sm text-content-primary"
          placeholder="예: 땅콩, 우유"
          placeholderTextColor={tokens.color["content-muted"]}
          value={input}
          onChangeText={setInput}
          maxLength={MAX_INPUT_LENGTH}
          returnKeyType="done"
          onSubmitEditing={handleAdd}
          editable={!isLoading}
        />
        <Pressable
          onPress={handleAdd}
          disabled={!isAddable}
          className={`h-[47px] w-[47px] items-center justify-center rounded-input ${isAddable ? "bg-content-primary" : "bg-content-muted"}`}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-sm font-bold text-white">추가</Text>
          )}
        </Pressable>
      </View>

      {/* 완료 버튼 */}
      <Pressable
        onPress={onClose}
        disabled={isLoading}
        className={`mt-6 h-[52px] items-center justify-center rounded-card ${isLoading ? "bg-content-muted" : "bg-content-primary"}`}
        style={{
          shadowColor: tokens.color["content-primary"],
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: isLoading ? 0 : 0.25,
          shadowRadius: 12,
          elevation: isLoading ? 0 : 6,
        }}
      >
        <Text className="text-base font-bold text-white">완료</Text>
      </Pressable>
    </View>
  );
}

// ─── AllergySettingsSheet ─────────────────────────────────────────────────────

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function AllergySettingsSheet({ isOpen, onClose }: Props) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} snapPoints={SHEET_SNAP_POINTS}>
      <AllergySettingsContent onClose={onClose} />
    </BottomSheet>
  );
}
