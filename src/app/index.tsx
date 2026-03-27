// 앱 루트 경로(/) 진입점
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/(protected)/(tabs)/home" />;
}
