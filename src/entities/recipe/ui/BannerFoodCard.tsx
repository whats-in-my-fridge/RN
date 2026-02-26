// Banner recipe card wrapper with banner-specific preset.
import type { ReactNode } from "react";
import type { RecipeCardData } from "../model/types";
import { BaseFoodCard } from "./BaseFoodCard";

interface BannerFoodCardProps {
  recipe: RecipeCardData;
  onPress?: () => void;
  likeButton?: ReactNode;
}

export function BannerFoodCard({ recipe, onPress, likeButton }: BannerFoodCardProps) {
  return (
    <BaseFoodCard recipe={recipe} variant="banner" onPress={onPress} likeButton={likeButton} />
  );
}
