# STEP37 상태 요약

- 제목: 토큰 전용 READ APIs (userId/email 제거)
- 목표: 사용자 전용 읽기 엔드포인트(내 옷장/내 룩/내 공개 코디)를 클라이언트가 userId/email을 보내지 않고 JWT 토큰으로 식별하도록 변경
- 구현 요약:
  - `backend/src/routes/data.ts`의 GET `/closet`, `/looks`, `/my-public-looks`에 `requireAuth` 적용
  - 서버에서 `req.user.id` / `req.user.email`로 필터링하여 해당 사용자 데이터만 반환
  - `services/dataService.ts`의 `fetchClosetItems()`, `fetchLooks()`, `fetchMyPublicLooks()`를 no-arg 함수로 변경
  - `store/useStore.ts` 호출부(로그인/부트스트랩)에서 더 이상 userId/email을 전달하지 않음
  - 공용 피드(`/api/data/public-looks`)는 공개로 유지 (인증 불필요)
- 변경된 파일 (주요):
  - `backend/src/routes/data.ts`
  - `services/dataService.ts`
  - `store/useStore.ts`
- 에러 동작 (한글):
  - 토큰 없음/잘못된 토큰 → 401 JSON: `{ error: "로그인이 필요합니다" }`
  - 권한 불일치 → 403 JSON: `{ error: "권한이 없습니다" }`
- 완료 기준:
  - 토큰이 있을 때 Dashboard/Closet/Looks가 정상 로드됨
  - 토큰 없을 때 사용자전용 읽기 API가 401을 반환하고 UI는 크래시하지 않음
  - 공용 피드는 인증 없이 로드됨

