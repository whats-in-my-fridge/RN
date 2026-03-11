/*
 * src/shared/ui/tab-bar/ScanTabButton.tsx
 */

import type { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Pressable, Text, View } from "react-native";
import { semanticColors, tokens } from "@/shared/config/tokens";
import { IconSymbol } from "@/shared/ui/icon-symbol";

const elevationOffset = tokens.spacing.xs + tokens.spacing.sm + 15;

export function ScanTabButton({ onPress }: BottomTabBarButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: tokens.spacing.sm,
        },
        pressed && { opacity: 0.8 },
      ]}
    >
      {/* Container for button + label */}
      <View
        style={{
          alignItems: "center",
          marginTop: -elevationOffset,
        }}
      >
        {/* Elevated circular button */}
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: semanticColors.primary,
            justifyContent: "center",
            alignItems: "center",
            // Shadow for elevation effect
            shadowColor: semanticColors.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: tokens.spacing.xs,
            elevation: 5,
          }}
        >
          <IconSymbol size={28} name="camera.fill" color={semanticColors.white} />
        </View>

        {/* Label: "스캔" */}
        <Text
          style={{
            marginTop: tokens.spacing.xs,
            fontSize: 10,
            fontWeight: "500",
            color: semanticColors["content-secondary"],
            fontFamily: "Pretendard",
            lineHeight: 15,
          }}
        >
          스캔
        </Text>
      </View>
    </Pressable>
  );
}
