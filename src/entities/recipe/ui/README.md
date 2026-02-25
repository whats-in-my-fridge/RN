<!-- Recipe UI 카드 컴포넌트 사용 가이드 -->
# Recipe Card UI 사용법

`src/entities/recipe/ui`는 레시피 카드의 **표현(UI)** 을 담당합니다.

- `BannerFoodCard`: 배너형 카드
- `DefaultFoodCard`: 일반형 카드

좋아요 동작(API/상태)은 `features`에서 주입합니다.

## 1) 기본 import

```tsx
import { BannerFoodCard, DefaultFoodCard } from "@/entities/recipe";
```

## 2) 데이터 타입

카드는 `RecipeCardData` 타입을 받습니다.

```ts
type RecipeCardData = {
  recipeId: number;
  title: string;
  thumbnail: string;
  matchRate: number;
  missingIngredients: string[];
  cookTime: string;
  difficulty: string;
  isLiked?: boolean;
};
```

## 3) 권장 사용 패턴

`likeButton` 슬롯으로 feature 컴포넌트를 주입해서 사용합니다.

```tsx
import { BannerFoodCard, DefaultFoodCard } from "@/entities/recipe";
import { RecipeLikedButton } from "@/features/recipe-liked-button";

<BannerFoodCard
  recipe={bannerRecipe}
  onPress={() => {}}
  likeButton={
    <RecipeLikedButton
      recipeId={bannerRecipe.recipeId}
      initialLiked={bannerRecipe.isLiked}
    />
  }
/>

<DefaultFoodCard
  recipe={defaultRecipe}
  onPress={() => {}}
  likeButton={
    <RecipeLikedButton
      recipeId={defaultRecipe.recipeId}
      initialLiked={defaultRecipe.isLiked}
    />
  }
/>
```

## 4) 설계 원칙

- `entities` 카드 UI는 **표현 전용**
- 좋아요 API/optimistic update는 **features**
- `BaseFoodCard` 및 `ui/parts/*`는 내부 구현 디테일이므로, 외부에서 직접 import하지 않는 것을 권장
