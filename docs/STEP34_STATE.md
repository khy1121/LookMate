# STEP34 상태 요약

- 제목: 쓰기 API 소유권 검증 적용
- 목표: 모든 쓰기 API(POST/PUT/DELETE)에 대해 JWT로 인증된 요청자만 리소스를 생성/수정/삭제하도록 소유권 검증 적용
- 구현 요약:
  - `requireAuth` 미들웨어 적용
  - 리소스 조회 후 `resource.userId` 또는 `ownerEmail`과 `req.user`를 비교하여 403 처리
  - 한글 에러 메시지(`권한이 없습니다`, `삭제 권한이 없습니다`) 사용
- 변경된 파일 (주요):
  - `backend/src/routes/data.ts` (closet, looks, public-looks 쓰기 경로)
- 완료 기준:
  - 다른 사용자의 리소스에 대해 쓰기 요청 시 403 반환
  - 인증되지 않은 쓰기 요청 시 401 반환

