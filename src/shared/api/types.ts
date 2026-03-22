// 공통 HTTP/API 에러 타입 — axios 래퍼에서 비정상 응답·네트워크 실패 시 사용한다.

/**
 * HTTP 에러(4xx/5xx) 및 네트워크·타임아웃 등 응답 없는 실패를 한 타입으로 처리한다.
 * - `status === 0`: 서버 응답 전에 실패(네트워크, 타임아웃, 취소 등)
 * - `code`: axios `error.code`(예: `ECONNABORTED`, `ERR_NETWORK`) 또는 유사 식별자
 */
export class ApiError extends Error {
  readonly status: number;
  readonly body?: string;
  readonly code?: string;

  constructor(message: string, status: number, body?: string, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
    this.code = code;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}
