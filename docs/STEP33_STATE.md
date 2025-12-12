# STEP33 상태 요약

- 제목: 백엔드 JWT 인증 도입 (기초)
- 목표: JWT 기반 인증을 도입하여 클라이언트가 토큰을 통해 인증하고, 서버가 토큰을 검증하도록 구현
- 구현 요약:
  - `backend/src/routes/auth.ts`에 `register`, `login`, `logout`, `me` 엔드포인트 추가
  - `backend/src/middleware/requireAuth.ts`로 Authorization 헤더의 Bearer 토큰 검증 및 `req.user` 주입
  - `backend/src/types/express.d.ts`로 Express `Request` 타입에 `user` 확장
  - 암호화: `bcryptjs`, 토큰: `jsonwebtoken`
- 변경된 파일 (주요):
  - `backend/src/routes/auth.ts`
  - `backend/src/middleware/requireAuth.ts`
  - `backend/src/types/express.d.ts`
- 주의사항:
  - 환경변수 `JWT_SECRET` 필요
  - 한글 에러 메시지 유지
- 완료 기준:
  - `/api/auth/login`이 토큰을 반환하고 `/api/auth/me`가 토큰으로 사용자 정보를 반환

