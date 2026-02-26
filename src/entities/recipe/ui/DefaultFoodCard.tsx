// Default recipe card wrapper with standard list-card preset.
import type { ReactNode } from "react";
import type { RecipeCardData } from "../model/types";
import { BaseFoodCard } from "./BaseFoodCard";

interface DefaultFoodCardProps {
  recipe: RecipeCardData;
  onPress?: () => void;
  likeButton?: ReactNode;
}

export function DefaultFoodCard({ recipe, onPress, likeButton }: DefaultFoodCardProps) {
  return (
    <BaseFoodCard recipe={recipe} variant="default" onPress={onPress} likeButton={likeButton} />
  );
}
