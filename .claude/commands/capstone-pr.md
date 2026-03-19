---
description: "whats_in_my_fridge Capstone 프로젝트 전용 PR 생성 스킬. 현재 브랜치의 변경사항을 분석해 프로젝트 PR 템플릿(요약/관련 이슈/작업 세부사항/참고사항)을 자동으로 채우고, gh CLI로 PR을 생성한다. base 브랜치는 항상 develop, 이슈 번호는 브랜치명에서 자동 추출, 내용은 FSD 레이어 기준으로 작성된다."
---

# CapstonePR — Capstone PR 생성 스킬

whats_in_my_fridge 프로젝트의 PR 템플릿에 맞춰 PR을 생성한다.
base 브랜치는 항상 `develop`이며, 이슈 번호는 브랜치명에서 자동 추출한다.

---

## Step 1 — 브랜치 정보 수집 (병렬 실행)

다음 명령을 **동시에** 실행해 현재 브랜치 상태를 파악한다:

```bash
git branch --show-current
git log develop..HEAD --oneline
git diff develop...HEAD --stat
git diff develop...HEAD --name-status
git diff develop...HEAD
git status
```

- 브랜치명 패턴 예시: `feat/#56-fridge-page`, `fix/#23-crash`, `refactor/#49-route`
- 브랜치명에서 이슈 번호(`#N`)를 추출한다. 패턴이 없으면 사용자에게 물어본다.
- `git log` 로 커밋 제목들을 확인해 변경의 흐름을 파악한다.
- `git diff --stat` 로 어떤 파일이 얼마나 변경됐는지 파악한다.
- `git diff` 전체 diff로 실제 변경 내용을 파악한다.

---

## Step 2 — PR 템플릿 작성

PR body를 아래 5개 섹션 순서로 작성한다. **반드시 한국어**, 모든 헤딩은 `##` 레벨로 통일한다 (GitHub에서 `##`은 하단에 구분선이 생긴다).

**마크다운 작성 규칙 (반드시 준수)**
- 특수기호(● 등)나 스페이스바를 이용한 수동 들여쓰기를 절대 사용하지 않는다.
- 제목은 `##`, 목록은 `-` 기호만 사용한다.
- 각 줄 끝의 후행 공백(trailing spaces)을 전부 제거한다.
- `## 변경 파일` 섹션은 반드시 ` ```text ` 펜스 코드블록으로 감싼다.

---

### `## 요약` 섹션

- **한 줄**로 작성한다. 불릿(`-`) 없이 단문으로.
- "무엇을 추가했다" 나열이 아니라 "왜", "어떤 목적"인지 핵심만.
- 문장은 반드시 **명사형**으로 끝낸다 (예: "~연결", "~구현", "~마련").
- 예) "냉장고 아이템 목록 조회 API 연동을 위한 FSD 구조 스텁 생성"

---

### `## 관련 이슈` 섹션

`Closes #N` 형식 고정. 이슈 번호를 모를 경우 사용자에게 묻는다.

출력 형식:
```
## 관련 이슈

- Closes #N
```

---

### `## 작업 세부사항` 섹션

- FSD 레이어 단위로 묶어서 작성한다 (pages / widgets / features / entities / shared / app).
- 파일 단위가 아닌 **의미 단위**(컴포넌트, 훅, 타입 등)로 기술한다.
- 새로 추가·수정·삭제된 항목을 구분해서 명시한다.
- 스텁(stub) 상태인 파일이 있다면 "스텁 상태" 명시.

---

### `## 참고사항` 섹션

- 리뷰어가 알아야 할 설계 결정 이유, 트레이드오프, 알려진 한계점.
- 후속 이슈가 있다면 해당 이슈 번호 언급.
- **이전 브랜치와 같은 도메인(예: fridge, chat 등)을 연속으로 작업한 경우**, 아래 내용을 반드시 포함한다.
  - 말투는 반드시 `~했습니다.` / `~입니다.` / `~주세요!` 등 자연스러운 경어체로 작성한다.
  - 이전 PR(#N)이 아직 머지되지 않아 File Changes에 이전 작업분이 함께 표시될 수 있음을 한 문장으로 알린다.
  - 그 다음 줄에 "이전 PR이 머지되지 않아 아래 파일 위주로 리뷰해 주시면 감사하겠습니다!" 와 같은 안내 문장을 쓴다.
  - 이어서 **이번 PR에서 새로 추가·수정한 파일**을 마크다운 리스트(`- \`src/경로/파일명.tsx\``)로 나열한다. 파일 경로는 `src/`부터 전체 경로를 적는다.
  - 이전 PR에서 이미 다룬 대표 파일도 한 줄로 언급해 범위를 명확히 한다.
  - 예)
    ```
    이전 #58 PR이 머지 대기 중이므로 File Changes에 해당 작업분이 함께 표시됩니다. 이전 PR이 머지되지 않아 아래 파일 위주로 리뷰해 주시면 감사하겠습니다!

    - `src/entities/fridge/ui/FridgeItemRow.tsx`
    - `src/entities/fridge/ui/ShelfDetailHeader.tsx`
    - `src/features/view-shelf-detail/ui/ShelfDetailSheet.tsx`

    이전 #58에서 신규 생성된 `types.ts`, `ItemChip.tsx` 등은 이번 PR 범위가 아닙니다.
    ```
- 없으면 빈 줄로 남긴다 (섹션 자체는 유지).

---

### `## 변경 파일` 섹션

`git diff develop...HEAD --name-status` 결과를 바탕으로 디렉토리 트리를 그린다.

트리 작성 규칙:
- `A` → `# 신규`, `M` → `# 수정`, `D` → `# 삭제`, `R` → `# 이동`
- `.claude/` 등 프로젝트 구현과 무관한 설정 파일은 제외한다.
- 파일명 뒤에 주석을 정렬해 가독성을 높인다.
- 반드시 ` ```text ` 펜스로 감싼다.

출력 형식 (이 형식을 그대로 따른다):

    ## 변경 파일
    ```text
    src/
    ├── entities/
    │   └── fridge/
    │       ├── index.ts              # 수정
    │       ├── model/
    │       │   ├── types.ts          # 신규
    │       │   └── freshness.ts      # 신규
    │       └── ui/
    │           ├── ItemChip.tsx      # 수정
    │           ├── ShelfRow.tsx      # 수정
    │           ├── DualShelfRow.tsx  # 신규
    │           └── SplitShelfRow.tsx # 삭제
    └── shared/
        └── config/
            ├── token-primitives.js   # 수정
            └── tokens.ts             # 수정
    tailwind.config.js                # 수정
    ```

---

## Step 3 — 사용자 확인

PR body 전문을 **`~~~` 펜스로 감싸서** 출력한다.
`~~~` 펜스 안에서는 내부 ` ```text ` 펜스가 그대로 노출되어 사용자가 복붙 시 raw 마크다운을 그대로 얻을 수 있다.

출력 형식:
~~~
## 요약
(내용)

## 관련 이슈
- Closes #N

## 작업 세부사항
(내용)

## 참고사항
(내용)

## 변경 파일
```text
src/
└── ...
```
~~~

전문 출력 후 **"이 내용으로 PR을 생성할까요?"** 라고 확인을 받은 뒤 생성한다.
수정 요청이 있으면 반영 후 재확인한다.

---

## Step 4 — PR 생성

HEREDOC이나 `--body` 인라인 문자열은 shell이 `#`, 백틱 등을 해석해서 마크다운이 깨진다.
반드시 **파일 경로**를 통해 body를 전달한다.

1. Write 도구로 `/tmp/pr-body.md` 파일에 Step 2에서 작성한 PR body 전문을 그대로 쓴다.
   - `###` 헤딩, `-` 목록, ` ```text ` 코드블록이 원본 그대로 보존되어야 한다.
   - 각 줄 끝에 후행 공백(trailing spaces)이 없어야 한다.
2. 아래 명령으로 PR을 생성한다:

```bash
gh pr create \
  --base develop \
  --title "[<prefix>/#<N>] <한국어 핵심 내용 1줄>" \
  --body-file /tmp/pr-body.md
```

3. PR 생성 후 `/tmp/pr-body.md`를 삭제한다.

### 제목 규칙
- prefix는 브랜치명에서 추출: `feat`, `fix`, `refactor`, `chore`, `docs` 등
- 예시: `[feat/#56] 냉장고 페이지 FSD 구조 스텁 생성`
- 예시: `[fix/#23] 스캔 탭 무한루프 수정`
- 예시: `[refactor/#49] 라우트 구조 리팩토링`

### 주의사항
- `--base develop` 은 절대 생략하지 않는다
- PR 생성 후 반환된 **PR URL을 반드시 출력**한다
- `git push` 가 안 된 상태라면 사용자에게 먼저 push를 요청한다 (`git push -u origin <브랜치명>` 명령어 안내)
- 이모지 사용 금지
