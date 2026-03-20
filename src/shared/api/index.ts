// shared/api 공개 API — axios 클라이언트와 공통 에러 타입

export {
  type ApiRequestInit,
  apiClient,
  apiDelete,
  apiGet,
  apiPost,
  apiPut,
  apiRequest,
} from "./client";
export { ApiError, isApiError } from "./types";
