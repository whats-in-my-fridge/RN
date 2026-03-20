// axios 기반 API 클라이언트 — base URL, JSON 요청/응답, 공통 에러·인증을 처리한다.

import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";
import { AUTH_TOKEN_KEY } from "@/shared/config/auth-storage";
import { getApiBaseUrl } from "@/shared/config/env";
import { ApiError } from "./types";

/** fetch 래퍼와 동일한 이름으로 유지: `body`는 axios의 `data`로 전달된다. */
export type ApiRequestInit = Omit<AxiosRequestConfig, "url" | "baseURL" | "data"> & {
  body?: unknown;
};

function toApiErrorFromAxios(error: AxiosError): ApiError {
  if (error.response) {
    const resData = error.response.data;
    const body =
      typeof resData === "string" ? resData : resData != null ? JSON.stringify(resData) : undefined;
    return new ApiError(
      error.message || `Request failed: ${error.response.status}`,
      error.response.status,
      body,
      error.code,
    );
  }

  const code = error.code ?? "ERR_NETWORK";
  const message = error.message || "Network request failed";
  return new ApiError(message, 0, undefined, code);
}

function createApiClient() {
  const instance = axios.create({
    baseURL: getApiBaseUrl(),
    timeout: 60_000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(async (config) => {
    try {
      const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // SecureStore 실패 시 인증 없이 진행 (로그인 전 등)
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => Promise.reject(toApiErrorFromAxios(error)),
  );

  return instance;
}

/** 인터셉터·기본 설정이 필요할 때 사용 */
export const apiClient = createApiClient();

function normalizeUrl(path: string): string {
  if (path.startsWith("http")) {
    return path;
  }
  return path.startsWith("/") ? path : `/${path}`;
}

/**
 * `path`는 `/auth/login/kakao` 형태(슬래시로 시작).
 * `http(s)://`로 시작하면 절대 URL로 요청한다.
 */
export async function apiRequest<T>(path: string, init: ApiRequestInit = {}): Promise<T> {
  const { body, ...rest } = init;
  const url = normalizeUrl(path);

  const { data } = await apiClient.request<T>({
    ...rest,
    url,
    data: body,
  });

  return data as T;
}

export async function apiGet<T>(
  path: string,
  init?: Omit<ApiRequestInit, "body" | "method">,
): Promise<T> {
  return apiRequest<T>(path, { ...init, method: "GET" });
}

export async function apiPost<T>(
  path: string,
  body?: unknown,
  init?: Omit<ApiRequestInit, "body" | "method">,
): Promise<T> {
  return apiRequest<T>(path, { ...init, method: "POST", body });
}

export async function apiPut<T>(
  path: string,
  body?: unknown,
  init?: Omit<ApiRequestInit, "body" | "method">,
): Promise<T> {
  return apiRequest<T>(path, { ...init, method: "PUT", body });
}

export async function apiDelete<T>(
  path: string,
  init?: Omit<ApiRequestInit, "body" | "method">,
): Promise<T> {
  return apiRequest<T>(path, { ...init, method: "DELETE" });
}
