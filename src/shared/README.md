# shared 레이어 가이드

`shared` 레이어는 프로젝트 전반에서 재사용되는 **공용 코드**를 담습니다.

## 하위 디렉토리(현재)

- `shared/ui`: 재사용 UI 컴포넌트(테마 컴포넌트, 공용 버튼/텍스트 등)
- `shared/lib`: 공용 유틸/훅/헬퍼
- `shared/config`: 공용 설정(테마/상수 등)
- `shared/assets`: 공용 에셋(이미지/아이콘/폰트 등)

## 규칙

- `shared`는 상위 레이어(`entities/features/widgets/pages/app`)를 **절대 import 하지 않습니다**.
- 되도록 프레임워크/라우터 의존은 최소화하고(예: `expo-router`), 필요 시 `shared` 밖으로 분리합니다.

