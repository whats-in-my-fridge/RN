// Chip display calculation utilities for recipe card variants.
import type { RecipeCardData } from "./types";

const BASE_INGREDIENT_LIMIT = 3;
const CHIP_GAP = 8;
const CHIP_HORIZONTAL_PADDING = 24;
const OVERFLOW_CHIP_BASE_WIDTH = 36;

export interface BannerChipDisplay {
  visibleLabels: string[];
  totalOverflow: number;
  showEnoughChip: boolean;
}

export function getVisibleMissingIngredients(
  recipe: RecipeCardData,
  limit = BASE_INGREDIENT_LIMIT,
) {
  const visibleIngredients = recipe.missingIngredients.slice(0, limit);
  const overflowCount = Math.max(recipe.missingIngredients.length - limit, 0);

  return { visibleIngredients, overflowCount };
}

function getEstimatedChipWidth(label: string) {
  const textWidth = label.length * 10;
  return textWidth + CHIP_HORIZONTAL_PADDING;
}

export function getBannerChipDisplay(
  labels: string[],
  overflowCount: number,
  maxWidth: number,
): BannerChipDisplay {
  if (labels.length === 0 && overflowCount === 0) {
    return { visibleLabels: [], totalOverflow: 0, showEnoughChip: true };
  }

  if (maxWidth <= 0) {
    return { visibleLabels: labels, totalOverflow: overflowCount, showEnoughChip: false };
  }

  const visibleLabels: string[] = [];
  let usedWidth = 0;
  const reserveOverflow = overflowCount > 0 ? OVERFLOW_CHIP_BASE_WIDTH + CHIP_GAP : 0;

  for (const label of labels) {
    const chipWidth = getEstimatedChipWidth(label);
    const nextWidth = usedWidth + (visibleLabels.length > 0 ? CHIP_GAP : 0) + chipWidth;

    if (nextWidth + reserveOverflow > maxWidth) {
      break;
    }

    visibleLabels.push(label);
    usedWidth = nextWidth;
  }

  const hiddenByWidth = labels.length - visibleLabels.length;
  return {
    visibleLabels,
    totalOverflow: overflowCount + hiddenByWidth,
    showEnoughChip: false,
  };
}
