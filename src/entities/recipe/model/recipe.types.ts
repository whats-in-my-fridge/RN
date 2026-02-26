/** 재료 */
export interface Ingredient {
  name: string;
  /** 사용자가 보유한 재료인지 여부 */
  owned: boolean;
}

/** 조리 단계 */
export interface CookingStep {
  step: number;
  description: string;
  /** 소요 시간 (분) */
  duration: number;
  /** 조리 단계 이미지 (선택) */
  imageUrl?: string;
}

/** 레시피 */
export interface Recipe {
  id: string;
  title: string;
  /** 대표 이미지 */
  imageUrl: string;
  /** 카테고리 태그 (예: 한식, 양식) */
  category: string;
  /** 해시태그 목록 */
  tags: string[];
  /** 조리 시간 (분) */
  cookingTime: number;
  /** 인분 */
  servings: number;
  /** 난이도 */
  difficulty: "쉬움" | "보통" | "어려움";
  /** 레시피 설명 */
  description: string;
  /** 재료 목록 */
  ingredients: Ingredient[];
  /** 조리 순서 */
  steps: CookingStep[];
}
