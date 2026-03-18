// 범용 선택 입력 컴포넌트 — 모달 바텀시트 방식으로 옵션 선택
// 제네릭 T로 타입 안전한 value/onChange 지원

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { FlatList, Modal, Pressable, Text, View } from "react-native";

import { tokens } from "@/shared/config/tokens";

export type SelectOption<T extends string = string> = {
  label: string;
  value: T;
};

type Props<T extends string> = {
  label?: string;
  placeholder?: string;
  options: SelectOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
};

export function SelectInput<T extends string>({
  label,
  placeholder = "선택하세요",
  options,
  value,
  onChange,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <View className="gap-[6px]">
      {label && (
        <Text className="text-xs font-medium leading-[18px] text-content-secondary">{label}</Text>
      )}

      {/* 트리거 */}
      <Pressable
        onPress={() => setOpen(true)}
        className="h-[47px] flex-row items-center justify-between rounded-input border border-stroke-default bg-surface-section px-4"
      >
        <Text
          className="text-sm"
          style={{
            color: selected ? tokens.color["content-primary"] : tokens.color["content-muted"],
          }}
        >
          {selected ? selected.label : placeholder}
        </Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={18}
          color={tokens.color["content-secondary"]}
        />
      </Pressable>

      {/* 옵션 모달 */}
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        {/* 백드롭: 탭 시 닫힘 */}
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "flex-end",
          }}
          onPress={() => setOpen(false)}
        >
          {/* 시트: 내부 탭이 백드롭으로 전파되지 않도록 Pressable 사용 */}
          <Pressable
            onPress={() => {}}
            style={{ backgroundColor: tokens.color["surface-app"] }}
            className="rounded-t-[24px] pb-8"
          >
            {/* 핸들 */}
            <View className="items-center pb-4 pt-3">
              <View className="h-1 w-8 rounded-full bg-stroke-default" />
            </View>

            {label && (
              <Text className="px-5 pb-3 text-base font-bold text-content-primary">{label}</Text>
            )}

            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                  className="flex-row items-center justify-between px-5 py-4"
                  style={{
                    backgroundColor:
                      item.value === value ? tokens.color["surface-section"] : "transparent",
                  }}
                >
                  <Text className="text-base text-content-primary">{item.label}</Text>
                  {item.value === value && (
                    <MaterialIcons name="check" size={18} color={tokens.color.primary} />
                  )}
                </Pressable>
              )}
              ItemSeparatorComponent={() => <View className="mx-5 h-px bg-stroke-default" />}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
