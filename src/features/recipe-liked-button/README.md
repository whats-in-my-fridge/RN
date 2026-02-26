<!-- recipe-liked-button feature 사용 가이드 -->
# RecipeLikedButton 사용법

`src/features/recipe-liked-button`은 레시피 좋아요 동작(UI + 상태 + API 호출)을 담당하는 feature입니다.

## 제공 컴포넌트

- `RecipeLikedButton`

```tsx
import { RecipeLikedButton } from "@/features/recipe-liked-button";
```

## Props

```ts
type RecipeLikedButtonProps = {
  recipeId: number;
  initialLiked?: boolean;
  disabled?: boolean;
  onLikeChanged?: (recipeId: number, isLiked: boolean) => void;
  onLikeError?: (error: Error) => void;
};
```

## 기본 사용 예시

```tsx
<RecipeLikedButton
  recipeId={recipe.recipeId}
  initialLiked={recipe.isLiked}
  onLikeError={(error) => alert(error.message)}
/>
```

## 카드뷰에 주입해서 쓰는 패턴

`entities` 카드의 `likeButton` 슬롯에 feature 버튼을 주입해 사용합니다.

```tsx
import { BannerFoodCard } from "@/entities/recipe";
import { RecipeLikedButton } from "@/features/recipe-liked-button";

<BannerFoodCard
  recipe={recipe}
  onPress={() => {}}
  likeButton={
    <RecipeLikedButton
      recipeId={recipe.recipeId}
      initialLiked={recipe.isLiked}
      onLikeError={(error) => alert(error.message)}
    />
  }
/>
```

## 현재 동작 방식

- 클릭 시 즉시 하트 상태를 토글(optimistic update)
- 내부 API 함수 호출 성공 시 `onLikeChanged` 콜백 실행
- 실패 시 이전 상태로 롤백 후 `onLikeError` 콜백 실행
- 로딩 중에는 버튼 입력이 비활성화됨

## 참고

- 실제 API 연결 지점: `api/post-recipe-liked.ts`
- 이 feature는 동작을 담당하고, 카드 UI는 `entities/recipe/ui`가 담당합니다.
