// 유통기한 D-day를 신선도 상태(신선·주의·임박)로 변환하는 순수 유틸리티

import type { FreshnessStatus } from "./types";

export function getFreshnessStatus(daysUntilExpiry: number): FreshnessStatus {
  if (daysUntilExpiry <= 3) return "expiring";
  if (daysUntilExpiry <= 7) return "caution";
  return "fresh";
}
