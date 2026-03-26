// 채팅 메시지 전송 훅
// 유저 메시지를 즉시 스토어에 추가하고, AI 에이전트 API를 호출해 응답을 받아 스토어에 추가한다.

import { useMutation } from "@tanstack/react-query";
import * as Crypto from "expo-crypto";
import { postAgentAsk } from "../api/post-agent-ask";
import { useChatStore } from "./store";

const ERROR_MESSAGE = "죄송합니다. 응답을 가져오는데 실패했습니다. 잠시 후 다시 시도해주세요.";

export function useChatSend() {
  const addMessage = useChatStore((s) => s.addMessage);

  const { mutate, isPending } = useMutation({
    mutationFn: (query: string) => postAgentAsk(query),
    onMutate: (query) => {
      addMessage({ id: Crypto.randomUUID(), role: "user", text: query });
    },
    onSuccess: (result) => {
      addMessage({ id: Crypto.randomUUID(), role: "assistant", text: result.answer });
    },
    onError: () => {
      addMessage({ id: Crypto.randomUUID(), role: "assistant", text: ERROR_MESSAGE });
    },
  });

  return { sendMessage: mutate, isPending };
}
