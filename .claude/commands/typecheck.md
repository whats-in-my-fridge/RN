---
description: "Biome 자동 수정 → 포맷 → 검사를 순서대로 실행한다. npm run biome-fix (자동 수정) → npm run biome-format (포맷) → npm run biome-check (최종 검사) 순으로 진행하며, 각 단계 결과를 출력한다."
---

# typecheck — Biome 통합 검사 스킬

`src/` 디렉토리 대상으로 Biome 자동 수정 → 포맷 → 검사를 순서대로 실행한다.

---

## 실행 순서

단계별로 **순차적으로** 실행한다. 이전 단계가 끝난 뒤 다음 단계를 실행한다.

### Step 1 — 자동 수정 (biome-fix)

```bash
npm run biome-fix
```

- lint 위반 중 자동으로 고칠 수 있는 것을 `--write` 옵션으로 수정한다.
- 결과(수정된 파일 수, 오류 수)를 출력한다.

### Step 2 — 포맷 적용 (biome-format)

```bash
npm run biome-format
```

- 코드 스타일(들여쓰기, 줄 길이 등)을 일괄 포맷한다.
- 결과를 출력한다.

### Step 3 — 최종 검사 (biome-check)

```bash
npm run biome-check
```

- 수정/포맷 후 남아있는 lint 문제를 검사한다.
- 오류가 있으면 해당 파일·라인·규칙명을 그대로 출력한다.

---

## 결과 리포트

모든 단계가 끝나면 아래 형식으로 요약한다:

```
[biome-fix]    완료 — 수정된 파일 N개 / 오류 N개
[biome-format] 완료 — 포맷된 파일 N개
[biome-check]  완료 — 오류 N개 (있으면 목록 출력)
```

- `biome-check` 에서 오류가 남아있으면 해당 항목을 열거하고, 자동 수정이 불가능한 이유(lint 규칙)를 설명한다.
- 모든 단계 통과 시 "Biome 검사 통과" 로 마무리한다.
