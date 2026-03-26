// AI 요리 도우미 Agentic RAG 질의 API 함수
// POST /recipes/agent/ask — 사용자 질문을 백엔드 AI 에이전트에 전달하고 답변을 받게 한다.

import { apiPost } from "@/shared/api";

type RecipeApiDTO = {
  recipeId: number;
  title: string;
  description: string;
  mainImage: string;
  cookTime: string;
  difficulty: string;
  servings: string;
  missingIngredients: string[];
  isScrapped: boolean;
};

export type AgentAskResult = {
  answer: string;
  recipes: RecipeApiDTO[];
  rewrittenQueries: string[];
  usedRetrieval: boolean;
  usedRerank: boolean;
};

type AgentAskRes = {
  message: string;
  result: AgentAskResult;
};

export async function postAgentAsk(query: string): Promise<AgentAskResult> {
  if (__DEV__) console.log("[POST /recipes/agent/ask] request", query);
  const data = await apiPost<AgentAskRes>("/recipes/agent/ask", { query });
  if (__DEV__) console.log("[POST /recipes/agent/ask] response", JSON.stringify(data, null, 2));
  return data.result;
}
