// 마이페이지에서 사용하는 사용자 프로필 도메인 타입 정의

export interface UserProfile {
  memberId: number;
  nickname: string;
  email: string | null;
  profileImageUrl: string | null;
  allergies: string[];
  dislikedIngredients: string[];
}
