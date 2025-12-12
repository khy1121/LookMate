# STEP36 상태 요약

- 제목: 프론트엔드 레거시 파라미터 제거
- 목표: 프론트엔드에서 더이상 이메일이나 userId를 API 요청(특히 쓰기)에 직접 전달하지 않도록 리팩터링
- 구현 요약:
  - `services/dataService.ts`에서 레거시 wrapper 제거 및 canonical 시그니처 사용
  - 호출부(예: `store/useStore.ts`, `pages/Dashboard.tsx`, `pages/Explore.tsx`)에서 이메일/유저ID 인자 제거
  - 백엔드는 `req.user` 기반으로 소유자 확인 책임 유지
- 변경된 파일 (주요):
  - `services/dataService.ts`
  - `store/useStore.ts`
  - `pages/Dashboard.tsx`, `pages/Explore.tsx` (호출부 수정)
- 완료 기준:
  - 쓰기 API 호출에서 이메일/유저ID가 전송되지 않음
  - 빌드/린트 통과

