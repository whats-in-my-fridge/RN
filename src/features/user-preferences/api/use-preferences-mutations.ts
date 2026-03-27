// 사용자 선호도 뮤테이션 훅 — TanStack Query를 사용해 알레르기 추가/삭제 API를 관리한다.

import { useMutation } from "@tanstack/react-query";
import { usePreferencesStore } from "../model/use-preferences-store";
import { updateUserPreferences } from "./update-preferences";

// ─── useAddAllergy ────────────────────────────────────────────────────────────

export function useAddAllergy() {
  const { allergies, setAllergies, dislikedIngredients } = usePreferencesStore();

  return useMutation({
    mutationFn: async (newAllergy: string) => {
      const trimmed = newAllergy.trim().slice(0, 30);
      if (!trimmed) throw new Error("알레르기명을 입력해주세요");
      if (allergies.includes(trimmed)) throw new Error("이미 등록된 알레르기입니다");

      const updated = [...allergies, trimmed];
      const result = await updateUserPreferences({
        allergies: updated,
        dislikedIngredients,
      });
      return result;
    },
    onSuccess: (result) => {
      setAllergies(result.allergies);
    },
  });
}

// ─── useRemoveAllergy ─────────────────────────────────────────────────────────

export function useRemoveAllergy() {
  const { allergies, setAllergies, dislikedIngredients } = usePreferencesStore();

  return useMutation({
    mutationFn: async (allergyToRemove: string) => {
      const updated = allergies.filter((a) => a !== allergyToRemove);
      const result = await updateUserPreferences({
        allergies: updated,
        dislikedIngredients,
      });
      return result;
    },
    onSuccess: (result) => {
      setAllergies(result.allergies);
    },
  });
}
