import { Pressable, Text, View } from "react-native";
import { tokens } from "@/shared/config/tokens";
import type { IconSymbolName } from "@/shared/ui/icon-symbol";
import { IconSymbol } from "@/shared/ui/icon-symbol";

interface SettingsListRowProps {
  icon: IconSymbolName;
  title: string;
  subtitle?: string;
  badge?: string | number;
  danger?: boolean;
  onPress?: () => void;
  /** 그룹 내 행일 때 true (테두리/라운드 제거) */
  grouped?: boolean;
}

export function SettingsListRow({
  icon,
  title,
  subtitle,
  badge,
  danger = false,
  onPress,
  grouped = false,
}: SettingsListRowProps) {
  const iconColor = danger ? tokens.color["status-expiring"] : tokens.color["content-secondary"];
  const titleColor = danger ? "text-status-expiring" : "text-content-primary";

  const containerClass = grouped
    ? "flex-row items-center bg-surface-card p-card active:opacity-90"
    : "flex-row items-center rounded-list border border-stroke-default bg-surface-card p-card active:opacity-90";

  return (
    <Pressable className={containerClass} onPress={onPress} disabled={!onPress}>
      <IconSymbol name={icon} size={24} color={iconColor} />
      <View className="ml-4 flex-1">
        <Text className={`text-base font-semibold ${titleColor}`}>{title}</Text>
        {subtitle && <Text className="mt-0.5 text-sm text-content-secondary">{subtitle}</Text>}
      </View>
      {badge !== undefined && (
        <View
          className="mr-2 rounded-badge px-2 py-0.5"
          style={{ backgroundColor: tokens.color["surface-section"] }}
        >
          <Text className="text-xs font-semibold text-content-secondary">{String(badge)}</Text>
        </View>
      )}
      <IconSymbol name="chevron.right" size={20} color={tokens.color["content-secondary"]} />
    </Pressable>
  );
}
