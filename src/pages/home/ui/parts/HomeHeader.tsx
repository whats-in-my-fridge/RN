// Home page header with user info and notifications.
import { Text, View } from "react-native";
import { useUserProfile } from "@/features/user-profile";
import { tokens } from "@/shared/config/tokens";
import { IconSymbol } from "@/shared/ui/icon-symbol";

export function HomeHeader() {
  const { data: userProfile } = useUserProfile();

  return (
    <View className="flex-row items-center justify-between px-screen py-4">
      <Text className="text-2xl font-extrabold text-content-primary">
        {userProfile?.nickname ? `${userProfile.nickname}님의 냉장고` : "냉장고"}
      </Text>
      <View>
        <IconSymbol name="bell" size={24} color={tokens.color["content-primary"]} />
        <View
          className="absolute -right-1 -top-1 h-4 w-4 items-center justify-center rounded-full"
          style={{ backgroundColor: tokens.color["status-expiring"] }}
        >
          <Text className="text-[9px] font-bold text-white">3</Text>
        </View>
      </View>
    </View>
  );
}
