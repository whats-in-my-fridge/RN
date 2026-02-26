// Base recipe card that centralizes shared UI and interactions for card variants.
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import { Image, Pressable, View } from "react-native";

import {
  type BannerChipDisplay,
  getBannerChipDisplay,
  getVisibleMissingIngredients,
} from "../model/chip-display";
import type { RecipeCardData, RecipeCardVariant } from "../model/types";
import { BannerCardContent, DefaultCardContent, MatchRateBadge } from "./parts";

interface BaseFoodCardProps {
  recipe: RecipeCardData;
  variant: RecipeCardVariant;
  onPress?: () => void;
  likeButton?: ReactNode;
}

const BASE_INGREDIENT_LIMIT = 3;
const BANNER_CHIP_RATIO = 0.4;

export function BaseFoodCard({ recipe, variant, onPress, likeButton }: BaseFoodCardProps) {
  const { visibleIngredients, overflowCount } = getVisibleMissingIngredients(
    recipe,
    BASE_INGREDIENT_LIMIT,
  );
  const isBanner = variant === "banner";
  const [bannerWidth, setBannerWidth] = useState(0);
  const isBannerLayoutReady = bannerWidth > 0;
  const maxChipWidth = bannerWidth * BANNER_CHIP_RATIO;
  const bannerChipDisplay = useMemo<BannerChipDisplay>(() => {
    if (!isBannerLayoutReady) {
      return { visibleLabels: [], totalOverflow: 0, showEnoughChip: false };
    }
    return getBannerChipDisplay(visibleIngredients, overflowCount, maxChipWidth);
  }, [isBannerLayoutReady, visibleIngredients, overflowCount, maxChipWidth]);

  const handleBannerLayout = (event: LayoutChangeEvent) => {
    if (!isBanner) {
      return;
    }
    setBannerWidth(event.nativeEvent.layout.width);
  };

  const imageHeightClassName = isBanner ? "h-64" : "h-40";
  const bannerOverlay = isBanner ? <View className="absolute inset-0 bg-black/40" /> : null;
  const rightTopAction = likeButton ? (
    <View className="absolute right-3 top-3">{likeButton}</View>
  ) : null;
  const variantOverlayContent = isBanner ? (
    <BannerCardContent
      recipe={recipe}
      chipDisplay={bannerChipDisplay}
      chipsVisible={isBannerLayoutReady}
    />
  ) : (
    <DefaultCardContent
      section="overlay"
      labels={visibleIngredients}
      overflowCount={overflowCount}
    />
  );
  const variantBottomContent = isBanner ? null : (
    <DefaultCardContent section="bottom" recipe={recipe} />
  );

  return (
    <Pressable
      className="overflow-hidden rounded-hero bg-surface-card shadow-sm ring-1 ring-stroke-default"
      onPress={onPress}
    >
      <View className={imageHeightClassName} onLayout={handleBannerLayout}>
        <Image source={{ uri: recipe.thumbnail }} className="h-full w-full" resizeMode="cover" />
        {bannerOverlay}

        <View className="absolute left-3 top-3">
          <MatchRateBadge matchRate={recipe.matchRate} />
        </View>
        {rightTopAction}
        {variantOverlayContent}
      </View>

      {variantBottomContent}
    </Pressable>
  );
}
