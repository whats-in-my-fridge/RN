import { ScrollView, Text, View } from "react-native";

import type { Recipe } from "@/entities/recipe/model/recipe.types";
import { useRecipeDetail } from "@/entities/recipe/model/useRecipeDetail";
import { RecipeHero, RecipeIngredients, RecipeMeta, RecipeSteps } from "@/widgets/RecipeDetail";

// ────────────────────────────────────────────────────────
// 더미 데이터 (Figma Make RecipeDetail 데이터 기반)
// id는 SearchPage recipeId와 일치 (1~6)
// ────────────────────────────────────────────────────────
const DUMMY_RECIPES: Record<string, Recipe> = {
  '1': {
    id: '1',
    title: '김치찌개',
    imageUrl: 'https://images.unsplash.com/photo-1760228865341-675704c22a5b?w=600',
    category: '한식',
    tags: ['한식', '찌개', '얼큰'],
    cookingTime: 20,
    servings: 2,
    difficulty: '쉬움',
    calories: 320,
    description: '냉장고에 남은 김치로 만드는 칼칼하고 시원한 찌개. 돼지고기와 두부가 들어가 더욱 든든합니다.',
    ingredients: [
      { name: '김치', amount: '200g', owned: true },
      { name: '돼지고기', amount: '150g', owned: true },
      { name: '두부', amount: '1/2모', owned: true },
      { name: '대파', amount: '1대', owned: false },
      { name: '고추장', amount: '1큰술', owned: false },
    ],
    steps: [
      { step: 1, description: '김치를 먹기 좋게 썰고, 돼지고기는 얇게 슬라이스합니다.', duration: 5 },
      { step: 2, description: '냄비에 참기름을 두르고 돼지고기와 김치를 함께 볶습니다.', duration: 8 },
      { step: 3, description: '물 2컵을 붓고 끓기 시작하면 고추장과 간장으로 간을 맞춥니다.', duration: 10, imageUrl: 'https://images.unsplash.com/photo-1760228865341-675704c22a5b?w=400' },
      { step: 4, description: '두부를 큼직하게 썰어 넣고 5분 더 끓입니다.', duration: 5 },
      { step: 5, description: '대파를 송송 썰어 얹고 불을 끄면 완성입니다.', duration: 2 },
    ],
  },
  '2': {
    id: '2',
    title: '안심 스테이크',
    imageUrl: 'https://images.unsplash.com/photo-1708615017161-2eff302d0389?w=600',
    category: '양식',
    tags: ['양식', '고기', '특식'],
    cookingTime: 35,
    servings: 1,
    difficulty: '보통',
    calories: 580,
    description: '소금과 후추만으로 고기 본연의 맛을 살린 레스토랑 수준의 스테이크를 집에서 즐겨보세요.',
    ingredients: [
      { name: '소금', amount: '적당량', owned: true },
      { name: '후추', amount: '적당량', owned: true },
      { name: '안심', amount: '200g', owned: false },
      { name: '마늘', amount: '3쪽', owned: false },
      { name: '버터', amount: '20g', owned: false },
    ],
    steps: [
      { step: 1, description: '고기를 실온에 30분 꺼내두고 소금, 후추로 밑간합니다.', duration: 30 },
      { step: 2, description: '팬을 강불로 달군 후 올리브유를 두르고 고기를 올립니다.', duration: 4, imageUrl: 'https://images.unsplash.com/photo-1708615017161-2eff302d0389?w=400' },
      { step: 3, description: '버터, 마늘을 넣고 버터를 끼얹으며 1분간 더 굽습니다.', duration: 1 },
      { step: 4, description: '5분간 레스팅 후 썰면 완성입니다.', duration: 5 },
    ],
  },
  '3': {
    id: '3',
    title: '비빔밥',
    imageUrl: 'https://images.unsplash.com/photo-1560100927-c32f29063ade?w=600',
    category: '한식',
    tags: ['한식', '밥', '건강'],
    cookingTime: 25,
    servings: 2,
    difficulty: '보통',
    calories: 420,
    description: '다채로운 나물과 고추장이 어우러진 전통 비빔밥. 냉장고 채소들을 모두 활용할 수 있어요.',
    ingredients: [
      { name: '당근', amount: '1/2개', owned: true },
      { name: '계란', amount: '2개', owned: true },
      { name: '밥', amount: '2공기', owned: false },
      { name: '시금치', amount: '100g', owned: false },
      { name: '고추장', amount: '2큰술', owned: false },
    ],
    steps: [
      { step: 1, description: '당근과 시금치를 각각 데쳐 참기름, 소금으로 무칩니다.', duration: 10 },
      { step: 2, description: '계란은 프라이로 반숙 상태로 만듭니다.', duration: 5, imageUrl: 'https://images.unsplash.com/photo-1560100927-c32f29063ade?w=400' },
      { step: 3, description: '따뜻한 밥 위에 나물을 색깔 맞춰 둘러 담습니다.', duration: 3 },
      { step: 4, description: '가운데 달걀 프라이를 올리고 참기름을 둘러 비비면 완성입니다.', duration: 2 },
    ],
  },
  '4': {
    id: '4',
    title: '잡채',
    imageUrl: 'https://images.unsplash.com/photo-1583032015879-e5022cb87c3b?w=600',
    category: '한식',
    tags: ['한식', '명절'],
    cookingTime: 35,
    servings: 3,
    difficulty: '보통',
    calories: 380,
    description: '당면과 다채로운 채소가 어우러진 잡채. 명절 단골 메뉴지만 평소에도 손색없는 별미입니다.',
    ingredients: [
      { name: '당근', amount: '1/2개', owned: true },
      { name: '당면', amount: '200g', owned: false },
      { name: '소고기', amount: '100g', owned: false },
      { name: '시금치', amount: '100g', owned: false },
      { name: '양파', amount: '1/2개', owned: false },
    ],
    steps: [
      { step: 1, description: '당면을 삶아 건져둡니다.', duration: 10 },
      { step: 2, description: '채소와 소고기를 각각 볶습니다.', duration: 15, imageUrl: 'https://images.unsplash.com/photo-1583032015879-e5022cb87c3b?w=400' },
      { step: 3, description: '모든 재료를 한데 섞고 간장, 참기름으로 양념합니다.', duration: 5 },
    ],
  },
  '5': {
    id: '5',
    title: '토마토 파스타',
    imageUrl: 'https://images.unsplash.com/photo-1528751086790-81a64658fc53?w=600',
    category: '양식',
    tags: ['양식', '간단'],
    cookingTime: 25,
    servings: 2,
    difficulty: '쉬움',
    calories: 460,
    description: '싱싱한 토마토와 마늘로 만드는 간단하면서도 맛있는 파스타입니다.',
    ingredients: [
      { name: '토마토', amount: '4개', owned: true },
      { name: '소금', amount: '적당량', owned: true },
      { name: '파스타', amount: '200g', owned: false },
      { name: '마늘', amount: '4쪽', owned: false },
      { name: '올리브유', amount: '3큰술', owned: false },
    ],
    steps: [
      { step: 1, description: '끓는 소금물에 파스타를 알덴테로 삶습니다.', duration: 9 },
      { step: 2, description: '올리브유에 마늘을 볶다가 토마토를 넣고 소스를 만듭니다.', duration: 8, imageUrl: 'https://images.unsplash.com/photo-1528751086790-81a64658fc53?w=400' },
      { step: 3, description: '소스에 삶은 파스타를 넣고 면수를 추가해 잘 섞어 완성합니다.', duration: 3 },
    ],
  },
  '6': {
    id: '6',
    title: '라멘',
    imageUrl: 'https://images.unsplash.com/photo-1731460202531-bf8389d565f7?w=600',
    category: '일식',
    tags: ['일식', '면'],
    cookingTime: 30,
    servings: 1,
    difficulty: '어려움',
    calories: 520,
    description: '진한 돈코츠 풍미의 라멘. 육수를 정성껏 끓이면 전문점 부럽지 않은 한 그릇이 완성됩니다.',
    ingredients: [
      { name: '돼지고기', amount: '150g', owned: true },
      { name: '계란', amount: '1개', owned: true },
      { name: '라멘면', amount: '1인분', owned: false },
      { name: '대파', amount: '1대', owned: false },
    ],
    steps: [
      { step: 1, description: '면을 삶고 육수를 끓입니다.', duration: 15 },
      { step: 2, description: '그릇에 면과 육수를 담습니다.', duration: 5, imageUrl: 'https://images.unsplash.com/photo-1731460202531-bf8389d565f7?w=400' },
      { step: 3, description: '차슈, 계란, 대파 등 토핑을 올려 완성합니다.', duration: 3 },
    ],
  },
};

interface RecipeDetailPageProps {
  recipeId: string;
}

export function RecipeDetailPage({ recipeId }: RecipeDetailPageProps) {
  const { recipe, ownedIngredients, missingIngredients } = useRecipeDetail(recipeId, DUMMY_RECIPES);

  if (!recipe) {
    return (
      <View className="flex-1 items-center justify-center bg-surface-app">
        <Text className="text-base text-content-secondary">레시피를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-surface-app" showsVerticalScrollIndicator={false}>
      {/* 히어로 이미지 */}
      <RecipeHero recipe={recipe} />

      <View className="px-screen py-6">
        {/* 메타 정보 + 설명 */}
        <RecipeMeta recipe={recipe} />

        {/* 구분선 */}
        <View className="my-6 h-px bg-stroke-default" />

        {/* 재료 */}
        <RecipeIngredients owned={ownedIngredients} missing={missingIngredients} />

        {/* 구분선 */}
        <View className="my-6 h-px bg-stroke-default" />

        {/* 조리 순서 */}
        <RecipeSteps steps={recipe.steps} />
      </View>
    </ScrollView>
  );
}
