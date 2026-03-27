// 마이페이지 상단에 표시되는 사용자 프로필 카드 컴포넌트

import { Image, Pressable, Text, View } from "react-native";
import { tokens } from "@/shared/config/tokens";
import { IconSymbol } from "@/shared/ui/icon-symbol";

const AVATAR_SIZE = 56; // 프로필 아이콘/이미지 크기 (h-14 w-14)

interface ProfileCardProps {
  nickname?: string | null;
  email?: string | null;
  profileImageUrl?: string | null;
  onEdit?: () => void;
}

export function ProfileCard({ nickname, email, profileImageUrl, onEdit }: ProfileCardProps) {
  const displayNickname = nickname ?? "사용자";

  return (
    <View className="flex-row items-center rounded-list border border-stroke-default bg-surface-card p-card">
      <View
        className="items-center justify-center rounded-full overflow-hidden"
        style={{
          width: AVATAR_SIZE,
          height: AVATAR_SIZE,
          backgroundColor: tokens.color["surface-section"],
        }}
      >
        {profileImageUrl ? (
          <Image
            source={{ uri: profileImageUrl }}
            style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
            resizeMode="cover"
          />
        ) : (
          <IconSymbol name="person.fill" size={28} color={tokens.color["content-secondary"]} />
        )}
      </View>
      <View className="ml-4 flex-1">
        <Text className="text-base font-bold text-content-primary">{displayNickname}</Text>
        {email ? <Text className="mt-0.5 text-sm text-content-secondary">{email}</Text> : null}
      </View>
      {onEdit && (
        <Pressable
          className="rounded-button border border-stroke-default bg-surface-section px-4 py-2 active:opacity-90"
          onPress={onEdit}
        >
          <Text className="text-sm font-semibold text-content-secondary">편집</Text>
        </Pressable>
      )}
    </View>
  );
}
