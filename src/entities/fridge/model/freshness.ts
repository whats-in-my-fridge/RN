// 유통기한 D-day를 신선도 상태(신선·주의·임박)로 변환하는 순수 유틸리티

import type { FreshnessStatus } from "./types";

const EXPIRING_THRESHOLD_DAYS = 3;
const CAUTION_THRESHOLD_DAYS = 7;

export function getFreshnessStatus(daysUntilExpiry: number): FreshnessStatus {
  if (daysUntilExpiry <= EXPIRING_THRESHOLD_DAYS) return "expiring";
  if (daysUntilExpiry <= CAUTION_THRESHOLD_DAYS) return "caution";
  return "fresh";
}
