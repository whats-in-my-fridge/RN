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
const DEFAULT_CHIP_CONTAINER_INSET = 16; // left-1 (4px) + right-3 (12px)

export function BaseFoodCard({ recipe, variant, onPress, likeButton }: BaseFoodCardProps) {
  const { visibleIngredients, overflowCount } = getVisibleMissingIngredients(
    recipe,
    BASE_INGREDIENT_LIMIT,
  );
  const isBanner = variant === "banner";
  const [cardWidth, setCardWidth] = useState(0);
  const isLayoutReady = cardWidth > 0;
  const bannerChipDisplay = useMemo<BannerChipDisplay>(() => {
    if (cardWidth <= 0) {
      return { visibleLabels: [], totalOverflow: 0, showEnoughChip: false };
    }
    return getBannerChipDisplay(visibleIngredients, overflowCount, cardWidth * BANNER_CHIP_RATIO);
  }, [visibleIngredients, overflowCount, cardWidth]);

  const defaultChipDisplay = useMemo<BannerChipDisplay>(() => {
    if (cardWidth <= 0) {
      return { visibleLabels: [], totalOverflow: 0, showEnoughChip: false };
    }
    return getBannerChipDisplay(
      visibleIngredients,
      overflowCount,
      cardWidth - DEFAULT_CHIP_CONTAINER_INSET,
    );
  }, [visibleIngredients, overflowCount, cardWidth]);

  const handleLayout = (event: LayoutChangeEvent) => {
    setCardWidth(event.nativeEvent.layout.width);
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
      chipsVisible={isLayoutReady}
    />
  ) : isLayoutReady ? (
    <DefaultCardContent
      section="overlay"
      labels={defaultChipDisplay.visibleLabels}
      overflowCount={defaultChipDisplay.totalOverflow}
    />
  ) : null;
  const variantBottomContent = isBanner ? null : (
    <DefaultCardContent section="bottom" recipe={recipe} />
  );

  return (
    <Pressable className="overflow-hidden rounded-hero bg-surface-card shadow-sm" onPress={onPress}>
      <View className={imageHeightClassName} onLayout={handleLayout}>
        <Image source={{ uri: recipe.thumbnail }} className="h-full w-full" resizeMode="cover" />
        {bannerOverlay}

        {recipe.matchRate !== undefined && recipe.matchRate > 0 && (
          <View className="absolute left-3 top-3">
            <MatchRateBadge matchRate={recipe.matchRate} />
          </View>
        )}
        {rightTopAction}
        {variantOverlayContent}
      </View>

      {variantBottomContent}
    </Pressable>
  );
}
