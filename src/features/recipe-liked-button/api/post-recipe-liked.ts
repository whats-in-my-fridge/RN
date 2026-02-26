// 향 후에 실제 API 요청을 처리하는 함수로 변경될 예정
export async function postRecipeLiked(recipeId: number, isLiked: boolean) {
  try {
    if (!recipeId || recipeId < 1) {
      throw new Error("유효하지 않은 레시피 ID입니다.");
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 250);
    });

    return { recipeId, isLiked };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("레시피 좋아요 요청에 실패했습니다.");
  }
}
