// Feature-level like button that owns recipe-like interaction state and side effects.

import { useEffect, useState } from "react";
import type { GestureResponderEvent } from "react-native";
import { ActivityIndicator, Pressable } from "react-native";

import { tokens } from "@/shared/config/tokens";
import { IconSymbol } from "@/shared/ui/icon-symbol";
import { postRecipeLiked } from "../api/post-recipe-liked";

interface RecipeLikedButtonProps {
  recipeId: number;
  initialLiked?: boolean;
  disabled?: boolean;
  onLikeChanged?: (recipeId: number, isLiked: boolean) => void;
  onLikeError?: (error: Error) => void;
}

export function RecipeLikedButton({
  recipeId,
  initialLiked,
  disabled,
  onLikeChanged,
  onLikeError,
}: RecipeLikedButtonProps) {
  const [isLiked, setIsLiked] = useState(!!initialLiked);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLiked(!!initialLiked);
  }, [initialLiked]);

  const isInteractionDisabled = disabled || isLoading;
  const activeHeartColor = tokens.color["heart-active"];
  const inactiveHeartColor = tokens.color["heart-inactive"];

  const handlePress = async (event: GestureResponderEvent) => {
    event.stopPropagation();

    if (isInteractionDisabled) {
      return;
    }

    const previousLiked = isLiked;
    const nextLiked = !previousLiked;
    setIsLiked(nextLiked);
    setIsLoading(true);

    try {
      const response = await postRecipeLiked(recipeId, nextLiked);
      onLikeChanged?.(response.recipeId, response.isLiked);
    } catch (error) {
      setIsLiked(previousLiked);

      const handledError =
        error instanceof Error ? error : new Error("좋아요 처리 중 오류가 발생했습니다.");
      onLikeError?.(handledError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Pressable
      className="h-9 w-9 items-center justify-center rounded-tag bg-surface-card"
      disabled={isInteractionDisabled}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={isLiked ? "좋아요 취소" : "좋아요"}
      accessibilityState={{ disabled: isInteractionDisabled, busy: isLoading }}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={activeHeartColor} />
      ) : (
        <IconSymbol
          name={isLiked ? "heart.fill" : "heart"}
          size={18}
          color={isLiked ? activeHeartColor : inactiveHeartColor}
        />
      )}
    </Pressable>
  );
}
