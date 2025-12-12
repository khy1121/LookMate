# STEP35 상태 요약

- 제목: 프론트엔드 토큰 주입 및 초기 데이터 동기화
- 목표: 클라이언트에서 `localStorage.lm_token`을 읽어 모든 백엔드 요청에 `Authorization: Bearer <token>` 헤더를 자동으로 추가하고, 로그인 시 서버 데이터를 초기 동기화
- 구현 요약:
  - `services/apiClient.ts`에 토큰 자동 주입 로직 추가
  - `services/dataService.ts`의 쓰기 API들이 토큰을 전제로 동작하도록 통합
  - `store/useStore.ts`에서 로그인 시 서버 데이터를 우선으로 로드하도록 변경
- 변경된 파일 (주요):
  - `services/apiClient.ts`
  - `services/dataService.ts`
  - `store/useStore.ts`
- 완료 기준:
  - `Authorization` 헤더가 포함된 요청으로 백엔드 접근 가능
  - 로그인 후 `closet`/`looks`가 서버 데이터로 동기화

